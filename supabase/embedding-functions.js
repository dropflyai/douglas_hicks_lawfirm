// Supabase Edge Functions for Vector Embeddings and AI Operations
// Deploy these as Supabase Edge Functions for optimal performance

// Function 1: Generate and Store Case Embeddings
export const generateCaseEmbeddings = async (req) => {
  const { case_id, case_text } = await req.json();
  
  try {
    // Generate embedding using OpenAI
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: case_text
      })
    });
    
    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;
    
    // Store embedding in Supabase
    const { data, error } = await supabase
      .from('case_precedents')
      .update({ 
        embedding: JSON.stringify(embedding),
        updated_at: new Date().toISOString()
      })
      .eq('id', case_id);
    
    if (error) throw error;
    
    return new Response(JSON.stringify({ 
      success: true, 
      embedding_generated: true,
      case_id: case_id
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Function 2: Batch Process Legal Knowledge Embeddings
export const batchProcessLegalKnowledge = async (req) => {
  try {
    // Get unprocessed legal knowledge entries
    const { data: knowledgeItems, error } = await supabase
      .from('legal_knowledge')
      .select('id, title, content')
      .is('embedding', null)
      .limit(50); // Process in batches of 50
    
    if (error) throw error;
    
    const results = [];
    
    for (const item of knowledgeItems) {
      try {
        // Combine title and content for embedding
        const text = `${item.title}\n\n${item.content}`;
        
        // Generate embedding
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: text
          })
        });
        
        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;
        
        // Update database with embedding
        const { error: updateError } = await supabase
          .from('legal_knowledge')
          .update({ 
            embedding: JSON.stringify(embedding),
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);
        
        if (updateError) {
          results.push({ id: item.id, success: false, error: updateError.message });
        } else {
          results.push({ id: item.id, success: true });
        }
        
        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (itemError) {
        results.push({ id: item.id, success: false, error: itemError.message });
      }
    }
    
    return new Response(JSON.stringify({ 
      processed: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results: results
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Function 3: Smart Case Analysis with Vector Search
export const smartCaseAnalysis = async (req) => {
  const { case_description, client_info } = await req.json();
  
  try {
    // Generate embedding for the case description
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: case_description
      })
    });
    
    const embeddingData = await embeddingResponse.json();\n    const queryEmbedding = embeddingData.data[0].embedding;\n    \n    // Search for similar cases\n    const { data: similarCases, error: casesError } = await supabase\n      .rpc('search_similar_cases', {\n        query_embedding: queryEmbedding,\n        match_threshold: 0.7,\n        match_count: 5\n      });\n    \n    if (casesError) throw casesError;\n    \n    // Search for relevant legal knowledge\n    const { data: legalKnowledge, error: knowledgeError } = await supabase\n      .rpc('search_legal_knowledge', {\n        query_embedding: queryEmbedding,\n        match_threshold: 0.7,\n        match_count: 3\n      });\n    \n    if (knowledgeError) throw knowledgeError;\n    \n    // Get case strategies\n    const { data: strategies, error: strategiesError } = await supabase\n      .from('case_strategies')\n      .select('*')\n      .limit(3);\n    \n    if (strategiesError) throw strategiesError;\n    \n    // Perform AI analysis with context\n    const analysisPrompt = `\nYou are an expert legal analyst for Douglas Hicks Law. Analyze this case:\n\nCASE DESCRIPTION:\n${case_description}\n\nCLIENT INFO:\n${JSON.stringify(client_info, null, 2)}\n\nSIMILAR PRECEDENTS:\n${similarCases.map(c => `- ${c.case_name}: $${(c.settlement_amount/100).toLocaleString()} (${c.case_type}, similarity: ${(c.similarity*100).toFixed(1)}%)`).join('\\n')}\n\nRELEVANT LEGAL KNOWLEDGE:\n${legalKnowledge.map(k => `- ${k.title}: ${k.content.substring(0, 200)}...`).join('\\n')}\n\nProvide a comprehensive analysis including:\n1. Case type and strength assessment\n2. Estimated settlement range based on precedents\n3. Key legal issues and potential challenges\n4. Recommended strategy approach\n5. Urgency level and next steps\n6. Success probability\n\nFormat as structured JSON.`;\n    \n    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {\n      method: 'POST',\n      headers: {\n        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        model: 'gpt-4-turbo-preview',\n        messages: [\n          {\n            role: 'system',\n            content: 'You are a senior legal analyst. Provide detailed case analysis in valid JSON format.'\n          },\n          {\n            role: 'user',\n            content: analysisPrompt\n          }\n        ],\n        temperature: 0.3,\n        max_tokens: 1500\n      })\n    });\n    \n    const aiData = await aiResponse.json();\n    let analysis;\n    \n    try {\n      analysis = JSON.parse(aiData.choices[0].message.content);\n    } catch (parseError) {\n      // Fallback if JSON parsing fails\n      analysis = {\n        raw_analysis: aiData.choices[0].message.content,\n        case_type: 'general',\n        strength: 'moderate',\n        estimated_value: 'TBD'\n      };\n    }\n    \n    return new Response(JSON.stringify({\n      analysis: analysis,\n      similar_cases: similarCases,\n      legal_knowledge: legalKnowledge,\n      strategies: strategies,\n      confidence: similarCases.length > 0 ? 0.8 : 0.6,\n      precedents_found: similarCases.length,\n      knowledge_found: legalKnowledge.length\n    }), {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n  } catch (error) {\n    return new Response(JSON.stringify({ \n      error: error.message,\n      stack: error.stack\n    }), {\n      status: 500,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  }\n};\n\n// Function 4: Update Conversation Context with Embeddings\nexport const updateConversationContext = async (req) => {\n  const { session_id, messages, case_analysis } = await req.json();\n  \n  try {\n    // Generate embedding for the latest conversation\n    const conversationText = messages.slice(-5).map(m => m.content).join('\\n');\n    \n    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {\n      method: 'POST',\n      headers: {\n        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        model: 'text-embedding-ada-002',\n        input: conversationText\n      })\n    });\n    \n    const embeddingData = await embeddingResponse.json();\n    const embedding = embeddingData.data[0].embedding;\n    \n    // Update conversation context with embedding\n    const { data, error } = await supabase\n      .from('conversation_context')\n      .upsert({\n        session_id: session_id,\n        messages: JSON.stringify(messages),\n        case_analysis: case_analysis,\n        conversation_embedding: JSON.stringify(embedding),\n        updated_at: new Date().toISOString(),\n        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours\n      });\n    \n    if (error) throw error;\n    \n    return new Response(JSON.stringify({ \n      success: true,\n      session_id: session_id,\n      messages_stored: messages.length\n    }), {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n  } catch (error) {\n    return new Response(JSON.stringify({ \n      error: error.message \n    }), {\n      status: 500,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  }\n};\n\n// Function 5: Training Data Collection and Analysis\nexport const collectTrainingData = async (req) => {\n  const { interaction_type, user_input, ai_response, feedback, session_id } = await req.json();\n  \n  try {\n    // Generate embeddings for input and response\n    const [inputEmbedding, responseEmbedding] = await Promise.all([\n      fetch('https://api.openai.com/v1/embeddings', {\n        method: 'POST',\n        headers: {\n          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          model: 'text-embedding-ada-002',\n          input: user_input\n        })\n      }).then(r => r.json()),\n      \n      fetch('https://api.openai.com/v1/embeddings', {\n        method: 'POST',\n        headers: {\n          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          model: 'text-embedding-ada-002',\n          input: ai_response\n        })\n      }).then(r => r.json())\n    ]);\n    \n    // Store training data\n    const { data, error } = await supabase\n      .from('ai_training_data')\n      .insert({\n        interaction_type: interaction_type,\n        user_input: user_input,\n        ai_response: ai_response,\n        human_feedback: feedback?.feedback_text,\n        accuracy_rating: feedback?.accuracy,\n        user_satisfaction: feedback?.satisfaction,\n        session_id: session_id,\n        input_embedding: JSON.stringify(inputEmbedding.data[0].embedding),\n        response_embedding: JSON.stringify(responseEmbedding.data[0].embedding)\n      });\n    \n    if (error) throw error;\n    \n    return new Response(JSON.stringify({ \n      success: true,\n      training_data_id: data[0].id\n    }), {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n  } catch (error) {\n    return new Response(JSON.stringify({ \n      error: error.message \n    }), {\n      status: 500,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  }\n};\n\n// Function 6: Performance Analytics and Learning\nexport const analyzePerformance = async (req) => {\n  try {\n    // Get recent training data for analysis\n    const { data: trainingData, error } = await supabase\n      .from('ai_training_data')\n      .select('*')\n      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())\n      .order('created_at', { ascending: false });\n    \n    if (error) throw error;\n    \n    // Calculate performance metrics\n    const metrics = {\n      total_interactions: trainingData.length,\n      average_accuracy: trainingData.filter(t => t.accuracy_rating).reduce((sum, t) => sum + t.accuracy_rating, 0) / trainingData.filter(t => t.accuracy_rating).length || 0,\n      average_satisfaction: trainingData.filter(t => t.user_satisfaction).reduce((sum, t) => sum + t.user_satisfaction, 0) / trainingData.filter(t => t.user_satisfaction).length || 0,\n      consultation_conversion: trainingData.filter(t => t.led_to_consultation).length / trainingData.length,\n      interaction_types: trainingData.reduce((acc, t) => {\n        acc[t.interaction_type] = (acc[t.interaction_type] || 0) + 1;\n        return acc;\n      }, {})\n    };\n    \n    // Identify areas for improvement\n    const lowPerformance = trainingData.filter(t => t.accuracy_rating && t.accuracy_rating < 3);\n    const improvementAreas = lowPerformance.reduce((acc, t) => {\n      acc[t.interaction_type] = (acc[t.interaction_type] || 0) + 1;\n      return acc;\n    }, {});\n    \n    return new Response(JSON.stringify({\n      performance_metrics: metrics,\n      improvement_areas: improvementAreas,\n      analysis_period: '7_days',\n      recommendations: [\n        metrics.average_accuracy < 4 ? 'Improve response accuracy through additional training' : null,\n        metrics.consultation_conversion < 0.3 ? 'Enhance qualification and urgency detection' : null,\n        Object.keys(improvementAreas).length > 0 ? `Focus training on: ${Object.keys(improvementAreas).join(', ')}` : null\n      ].filter(Boolean)\n    }), {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n  } catch (error) {\n    return new Response(JSON.stringify({ \n      error: error.message \n    }), {\n      status: 500,\n      headers: { 'Content-Type': 'application/json' }\n    });\n  }\n};\n\n// Helper function to initialize Supabase client\nconst initSupabase = () => {\n  return createClient(\n    Deno.env.get('SUPABASE_URL'),\n    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')\n  );\n};\n\nconst supabase = initSupabase();