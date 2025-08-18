// Twilio Integration Setup for Douglas Hicks Law
// Handles incoming phone calls and routes to n8n AI workflow

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// TwiML for incoming calls - routes to n8n workflow
const generateCallTwiML = (callSid, from, to) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <!-- Welcome message -->
      <Say voice="alice">
        Hello, and thank you for calling Douglas Hicks Law. 
        I'm Maya, your AI legal assistant. 
        I'll help evaluate your case and connect you with our Dream Team attorneys.
      </Say>
      
      <!-- Record initial response -->
      <Say voice="alice">
        Please tell me about your legal situation. 
        Speak clearly and I'll analyze your case in real-time.
      </Say>
      
      <!-- Start recording -->
      <Record 
        timeout="60" 
        finishOnKey="*"
        action="/api/voice/process-recording"
        method="POST"
        transcribe="true"
        transcribeCallback="/api/voice/transcription"
        recordingStatusCallback="/api/voice/recording-status"
        maxLength="300"
        playBeep="true"
      />
      
      <!-- Fallback if no recording -->
      <Say voice="alice">
        I didn't receive your response. Let me transfer you to one of our attorneys.
      </Say>
      <Dial>
        <Number>+1-323-DOUGLAS</Number>
      </Dial>
    </Response>
  `;
};

// Advanced TwiML for interactive case evaluation
const generateInteractiveTwiML = () => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say voice="alice">
        Welcome to Douglas Hicks Law, home of the $4.9 billion Dream Team. 
        I'm Maya, your AI case evaluator.
      </Say>
      
      <Gather 
        input="speech dtmf" 
        timeout="10" 
        speechTimeout="auto"
        action="/api/voice/gather-case-type"
        method="POST"
      >
        <Say voice="alice">
          What type of legal case do you have? 
          You can say: Personal Injury, Civil Rights, Employment, or Medical Malpractice. 
          Or press 1 for Personal Injury, 2 for Civil Rights, 3 for Employment, or 4 for Medical Malpractice.
        </Say>
      </Gather>
      
      <!-- Fallback -->
      <Say voice="alice">
        I didn't receive your selection. Let me connect you with our intake team.
      </Say>
      <Dial>
        <Number>+1-323-DOUGLAS</Number>
      </Dial>
    </Response>
  `;
};

// Webhook endpoints for Twilio integration
const voiceWebhooks = {
  
  // Main incoming call handler
  '/api/voice/incoming': (req, res) => {
    const { CallSid, From, To, CallStatus } = req.body;
    
    console.log('Incoming call:', {
      callSid: CallSid,
      from: From,
      to: To,
      status: CallStatus
    });
    
    // Send to n8n workflow
    sendToN8N({
      type: 'incoming_call',
      data: {
        call_sid: CallSid,
        caller_number: From,
        called_number: To,
        call_status: CallStatus,
        timestamp: new Date().toISOString()
      }
    });
    
    // Return TwiML
    res.type('text/xml');
    res.send(generateInteractiveTwiML());
  },
  
  // Process case type selection
  '/api/voice/gather-case-type': async (req, res) => {
    const { CallSid, SpeechResult, Digits } = req.body;
    
    let caseType = '';
    if (SpeechResult) {
      caseType = await identifyCaseType(SpeechResult);
    } else if (Digits) {
      const typeMapping = {
        '1': 'Personal Injury',
        '2': 'Civil Rights', 
        '3': 'Employment',
        '4': 'Medical Malpractice'
      };
      caseType = typeMapping[Digits] || 'Unknown';
    }
    
    // Send case type to n8n for processing
    await sendToN8N({
      type: 'case_type_identified',
      data: {
        call_sid: CallSid,
        case_type: caseType,
        speech_input: SpeechResult,
        dtmf_input: Digits
      }
    });
    
    const twiml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="alice">
          Thank you. I understand you have a ${caseType} case. 
          Now please describe your situation in detail. 
          Tell me what happened, when it occurred, and what injuries or damages you suffered.
        </Say>
        
        <Record 
          timeout="120" 
          finishOnKey="*"
          action="/api/voice/analyze-case"
          method="POST"
          transcribe="true"
          maxLength="600"
          playBeep="true"
        />
        
        <Say voice="alice">
          I didn't receive your case details. Let me connect you directly with an attorney.
        </Say>
        <Dial>
          <Number>+1-323-DOUGLAS</Number>
        </Dial>
      </Response>
    `;
    
    res.type('text/xml');
    res.send(twiml);
  },
  
  // Process full case description and analyze
  '/api/voice/analyze-case': async (req, res) => {
    const { CallSid, RecordingUrl, TranscriptionText } = req.body;
    
    console.log('Analyzing case for call:', CallSid);
    
    // Send full case details to n8n AI workflow for analysis
    const analysisResult = await sendToN8N({
      type: 'full_case_analysis',
      data: {
        call_sid: CallSid,
        recording_url: RecordingUrl,
        transcript: TranscriptionText,
        input_type: 'voice',
        timestamp: new Date().toISOString()
      }
    });
    
    // Wait for AI analysis (or timeout after 30 seconds)
    const aiResponse = await waitForAIResponse(CallSid, 30000);
    
    let responseMessage = '';
    let nextAction = 'transfer';
    
    if (aiResponse && aiResponse.analysis) {
      const { tier, estimated_value, confidence, urgent } = aiResponse.analysis;
      
      if (tier === 'Platinum' || tier === 'Gold') {
        responseMessage = `
          Excellent. Based on my analysis, you have a very strong ${tier} tier case 
          with an estimated value of ${estimated_value}. 
          This is exactly the type of case our Dream Team specializes in, 
          similar to our $4.9 billion GM verdict and $8 million police brutality settlements.
          
          I'm immediately connecting you with one of our senior attorneys 
          who will schedule an urgent consultation today.
        `;
        nextAction = 'priority_transfer';
      } else if (tier === 'Silver') {
        responseMessage = `
          Thank you for sharing your case details. 
          This appears to be a viable ${tier} tier case worth approximately ${estimated_value}.
          
          I'd like to connect you with one of our attorneys 
          who can evaluate this further and discuss your options.
        `;
        nextAction = 'standard_transfer';
      } else {
        responseMessage = `
          Thank you for calling Douglas Hicks Law. 
          While this case has some challenges, 
          I'd still like to connect you with one of our attorneys 
          who may be able to provide guidance or refer you to a specialist.
        `;
        nextAction = 'referral_transfer';
      }
      
      // Send urgent alerts for high-value cases
      if (urgent || tier === 'Platinum') {
        await sendUrgentAlert(CallSid, aiResponse);
      }
    } else {
      responseMessage = `
        Thank you for providing those details. 
        Let me connect you directly with one of our experienced attorneys 
        who can properly evaluate your case.
      `;
    }
    
    const twiml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="alice">${responseMessage}</Say>
        <Dial timeout="30" record="record-from-ringing">
          <Number>${getTransferNumber(nextAction)}</Number>
        </Dial>
        <Say voice="alice">
          All of our attorneys are currently busy. 
          Please hold while I connect you to our priority intake line.
        </Say>
        <Dial>
          <Number>+1-323-DOUGLAS</Number>
        </Dial>
      </Response>
    `;
    
    res.type('text/xml');
    res.send(twiml);
  },
  
  // Handle transcription callbacks
  '/api/voice/transcription': async (req, res) => {
    const { CallSid, TranscriptionText, RecordingUrl } = req.body;
    
    // Send transcription to n8n for processing
    await sendToN8N({
      type: 'transcription_complete',
      data: {
        call_sid: CallSid,
        transcript: TranscriptionText,
        recording_url: RecordingUrl
      }
    });
    
    res.status(200).send('OK');
  }
};

// Helper functions
async function identifyCaseType(speechInput) {
  const caseKeywords = {
    'Personal Injury': ['accident', 'injured', 'hurt', 'car crash', 'slip', 'fall', 'medical malpractice'],
    'Civil Rights': ['police', 'discrimination', 'rights', 'brutality', 'violated', 'wrongful death'],
    'Employment': ['fired', 'workplace', 'harassment', 'discrimination', 'wrongful termination'],
    'Medical Malpractice': ['doctor', 'hospital', 'surgery', 'medical error', 'misdiagnosis']
  };
  
  const input = speechInput.toLowerCase();
  
  for (const [caseType, keywords] of Object.entries(caseKeywords)) {
    if (keywords.some(keyword => input.includes(keyword))) {
      return caseType;
    }
  }
  
  return 'General';
}

async function sendToN8N(payload) {
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL + '/douglas-hicks-voice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Twilio-Signature': generateSignature(payload)
      },
      body: JSON.stringify(payload)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to send to n8n:', error);
    return null;
  }
}

async function waitForAIResponse(callSid, timeoutMs) {
  // In production, use Redis or database to store/retrieve AI responses
  // For now, simulate waiting for response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analysis: {
          tier: 'Gold',
          estimated_value: '$750K-$1.2M',
          confidence: '85%',
          urgent: false
        }
      });
    }, 3000);
  });
}

function getTransferNumber(actionType) {
  const transferNumbers = {
    'priority_transfer': '+1-323-URGENT1', // Direct to senior attorney
    'standard_transfer': '+1-323-INTAKE1', // Standard intake line
    'referral_transfer': '+1-323-REFER1'   // Referral specialist
  };
  
  return transferNumbers[actionType] || '+1-323-DOUGLAS';
}

async function sendUrgentAlert(callSid, analysisData) {
  // Send to Slack, email, SMS alerts for high-value cases
  const alertData = {
    type: 'urgent_case_alert',
    call_sid: callSid,
    analysis: analysisData,
    timestamp: new Date().toISOString()
  };
  
  // Send to multiple alert channels
  await Promise.all([
    sendSlackAlert(alertData),
    sendSMSAlert(alertData),
    sendEmailAlert(alertData)
  ]);
}

function generateSignature(payload) {
  // Generate HMAC signature for security
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', process.env.TWILIO_WEBHOOK_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');
  return signature;
}

module.exports = {
  voiceWebhooks,
  generateCallTwiML,
  generateInteractiveTwiML
};