#!/bin/bash

# LawFly Pro Security Demo Script
# Demonstrates the security-first features that differentiate us from competitors

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Demo functions
print_header() {
    echo -e "${PURPLE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}═══════════════════════════════════════════════════════${NC}"
    echo
}

print_feature() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_demo() {
    echo -e "${BLUE}🔍 Demo: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

wait_for_input() {
    echo -e "${CYAN}Press Enter to continue...${NC}"
    read
}

# Main demo function
main() {
    clear
    echo -e "${PURPLE}"
    cat << "EOF"
██╗      █████╗ ██╗    ██╗███████╗██╗  ██╗   ██╗    ██████╗ ██████╗  ██████╗ 
██║     ██╔══██╗██║    ██║██╔════╝██║  ╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔═══██╗
██║     ███████║██║ █╗ ██║█████╗  ██║   ╚████╔╝     ██████╔╝██████╔╝██║   ██║
██║     ██╔══██║██║███╗██║██╔══╝  ██║    ╚██╔╝      ██╔═══╝ ██╔══██╗██║   ██║
███████╗██║  ██║╚███╔███╔╝██║     ███████╗██║       ██║     ██║  ██║╚██████╔╝
╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝     ╚══════╝╚═╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
EOF
    echo -e "${NC}"
    echo -e "${CYAN}Security-First Legal Operations Platform${NC}"
    echo -e "${CYAN}The ONLY legal platform where security isn't an afterthought${NC}"
    echo
    wait_for_input

    # Demo 1: Tenant Isolation
    print_header "Demo 1: Bulletproof Tenant Isolation"
    echo -e "🏢 ${BLUE}Most legal platforms:${NC} 'Trust us, your data is separate'"
    echo -e "🛡️  ${GREEN}LawFly Pro:${NC} 'Here's the proof your data is isolated'"
    echo
    
    print_demo "Database Row-Level Security (RLS) in action"
    echo "-- Every query is automatically tenant-scoped"
    echo -e "${YELLOW}SELECT * FROM documents WHERE tenant_id = current_setting('app.current_tenant_id')::uuid;${NC}"
    echo
    
    print_feature "Namespace isolation prevents cross-tenant data access"
    print_feature "VPC-per-tenant option for enterprise customers"
    print_feature "Separate encryption keys per tenant (BYOK)"
    echo
    wait_for_input

    # Demo 2: BYOK Encryption
    print_header "Demo 2: Bring Your Own Key (BYOK) Encryption"
    echo -e "🔐 ${BLUE}Other platforms:${NC} 'We encrypt your data with our keys'"
    echo -e "🔑 ${GREEN}LawFly Pro:${NC} 'YOU control your encryption keys'"
    echo
    
    print_demo "Customer-controlled AWS KMS integration"
    echo "Tenant: Biglaw Corp"
    echo "KMS Key: arn:aws:kms:us-east-1:123456789:key/customer-controlled-key"
    echo "Status: ✅ Active | 🔄 Auto-rotation enabled"
    echo
    
    print_feature "Customer owns and controls encryption keys"
    print_feature "Hardware Security Module (HSM) support"
    print_feature "Key rotation with zero downtime"
    print_feature "Cryptographic erasure for data deletion"
    echo
    wait_for_input

    # Demo 3: Zero-Trust Architecture
    print_header "Demo 3: Zero-Trust Security (Never Trust, Always Verify)"
    echo -e "🚫 ${BLUE}Traditional security:${NC} 'Inside the network = trusted'"
    echo -e "🔍 ${GREEN}LawFly Pro:${NC} 'Every request verified, every time'"
    echo
    
    print_demo "Real-time risk assessment"
    cat << EOF
User: john.attorney@biglaw.com
Device: MacBook Pro (Managed ✅)
Location: New York Office (Expected ✅)
Risk Score: 0.2/1.0 (Low Risk)
Decision: ✅ Allow with standard session timeout

User: jane.paralegal@biglaw.com  
Device: Personal iPhone (Unmanaged ⚠️)
Location: Coffee Shop WiFi (Unusual ⚠️)
Risk Score: 0.8/1.0 (High Risk)
Decision: ⚡ Require MFA + 30min session limit
EOF
    echo
    
    print_feature "Continuous verification of user, device, and network"
    print_feature "Adaptive authentication based on risk scoring"
    print_feature "Device posture assessment (encryption, updates, etc.)"
    echo
    wait_for_input

    # Demo 4: Immutable Audit Trail
    print_header "Demo 4: Tamper-Proof Audit Logging"
    echo -e "📝 ${BLUE}Standard logging:${NC} 'Here are our logs (trust us they're real)'"
    echo -e "🔒 ${GREEN}LawFly Pro:${NC} 'Cryptographically verifiable audit trail'"
    echo
    
    print_demo "Hash-chained audit events (blockchain-inspired)"
    cat << EOF
Event 1:
  ID: 550e8400-e29b-41d4-a716-446655440000
  Action: document_accessed
  User: attorney@lawfirm.com
  Hash: a7b8c9d0e1f2...
  Previous Hash: null

Event 2:
  ID: 550e8400-e29b-41d4-a716-446655440001
  Action: document_modified  
  User: attorney@lawfirm.com
  Hash: b8c9d0e1f2a3...
  Previous Hash: a7b8c9d0e1f2... ✅ Verified

🔗 Chain Integrity: ✅ VERIFIED
📦 S3 WORM Storage: ✅ Immutable backup created
EOF
    echo
    
    print_feature "Tamper-proof audit trail with hash chains"
    print_feature "Append-only storage with S3 Object Lock"
    print_feature "Legal hold capabilities for litigation"
    print_feature "Automated integrity verification"
    echo
    wait_for_input

    # Demo 5: AI Security
    print_header "Demo 5: Secure AI (Your Data Never Trains Our Models)"
    echo -e "🤖 ${BLUE}AI platforms:${NC} 'Your data makes our AI smarter for everyone'"
    echo -e "🛡️  ${GREEN}LawFly Pro:${NC} 'Your data stays yours, period'"
    echo
    
    print_demo "Private RAG with encrypted embeddings"
    echo "Document: 'Confidential Settlement Agreement - BigCorp vs SmallCorp'"
    echo "Processing: ✅ Encrypted embedding created"
    echo "Storage: ✅ Tenant-isolated vector database"
    echo "Query: 'What was the settlement amount?'"
    echo "Response: '$2.5M settlement (Source: Settlement_Agreement_2024.pdf)'"
    echo "Training: ❌ NEVER - Customer data excluded from model training"
    echo
    
    print_feature "No customer data used for model training"
    print_feature "Encrypted embeddings and vector storage"
    print_feature "Tenant-isolated AI knowledge base"
    print_feature "Full audit trail of AI interactions"
    print_feature "Human-in-the-loop for critical decisions"
    echo
    wait_for_input

    # Demo 6: Compliance Dashboard
    print_header "Demo 6: Real-Time Compliance Monitoring"
    echo -e "📊 ${BLUE}Manual compliance:${NC} 'Hope we're compliant come audit time'"
    echo -e "📈 ${GREEN}LawFly Pro:${NC} 'Real-time compliance score with evidence'"
    echo
    
    print_demo "Live compliance dashboard"
    cat << EOF
╭─────────────────────────────────────────────────────────╮
│                 COMPLIANCE DASHBOARD                     │
├─────────────────────────────────────────────────────────┤
│ SOC 2 Type II      │ 98.7% ✅ │ 127/129 controls passed │
│ GDPR              │ 96.2% ✅ │ Data mapping complete   │
│ HIPAA (PHI cases) │ 99.1% ✅ │ BAA ready              │
│ ABA Model Rules   │ 95.8% ✅ │ Client confidentiality │
├─────────────────────────────────────────────────────────┤
│ Last Audit: 2024-01-15  │  Next Audit: 2024-07-15      │
│ Pen Test: 2024-01-01    │  Next Test: 2024-04-01       │
│ Evidence Collected: ✅   │  Audit Ready: ✅              │
╰─────────────────────────────────────────────────────────╯
EOF
    echo
    
    print_feature "Continuous compliance monitoring"
    print_feature "Automated evidence collection"  
    print_feature "SOC 2, GDPR, HIPAA ready out-of-the-box"
    print_feature "Risk assessment and remediation tracking"
    echo
    wait_for_input

    # Demo 7: Remote Rendering
    print_header "Demo 7: Remote Rendering (Hypori-style Security)"
    echo -e "💻 ${BLUE}File downloads:${NC} 'Download and hope devices are secure'"
    echo -e "🖥️  ${GREEN}LawFly Pro:${NC} 'View sensitive docs without local data exposure'"
    echo
    
    print_demo "Sensitive document protection"
    echo "Document: Attorney-Client Privileged Communication"
    echo "Classification: 🔴 Restricted"
    echo "User Device: ⚠️  Unmanaged laptop"
    echo "Action: 🚫 Download blocked → 📺 Remote rendering enabled"
    echo
    echo "🎬 User sees: Document streamed via secure WebRTC"
    echo "🚫 User cannot: Download, print, screenshot, copy text"
    echo "📊 Admin sees: Real-time view sessions, watermarked content"
    echo
    
    print_feature "Stream sensitive documents without local storage"
    print_feature "DLP controls (no copy/paste/print/screenshot)"
    print_feature "Session recording and watermarking"
    print_feature "Policy-driven rendering decisions"
    echo
    wait_for_input

    # Demo 8: The Big Picture
    print_header "Demo 8: Why This Matters for Law Firms"
    echo -e "${CYAN}🏛️  Law firms face unique security challenges:${NC}"
    echo "   • Attorney-client privilege must be protected"
    echo "   • Ethical obligations under ABA Model Rules"
    echo "   • Regulatory compliance (HIPAA for medical malpractice, etc.)"
    echo "   • Target for nation-state attacks and ransomware"
    echo "   • Reputational damage from breaches is catastrophic"
    echo
    
    echo -e "${GREEN}🛡️  LawFly Pro's security-first approach:${NC}"
    print_feature "Built for legal industry from day one"
    print_feature "Security is our primary differentiator, not a checkbox"
    print_feature "Customer controls their encryption keys (BYOK)"
    print_feature "Tenant isolation prevents cross-contamination"
    print_feature "Zero-trust assumes breach and verifies everything"
    print_feature "Compliance-ready for all major frameworks"
    print_feature "Immutable audit trail for litigation support"
    print_feature "AI that respects client confidentiality"
    echo
    
    echo -e "${PURPLE}📈 The Result:${NC}"
    echo "   • Law firms can confidently move to the cloud"
    echo "   • IT departments sleep better at night"  
    echo "   • Compliance audits become routine, not stressful"
    echo "   • Client trust is maintained and enhanced"
    echo "   • Competitive advantage through superior security"
    echo
    wait_for_input

    # Closing
    print_header "LawFly Pro: Security-First Legal Operations"
    echo -e "${GREEN}We didn't just add security to a legal platform.${NC}"
    echo -e "${GREEN}We built security into the foundation of everything we do.${NC}"
    echo
    
    echo -e "${CYAN}🔐 Security Features That Set Us Apart:${NC}"
    echo "   ✅ True multi-tenant isolation with proof"
    echo "   ✅ Customer-controlled encryption (BYOK/HYOK)"  
    echo "   ✅ Zero-trust architecture with continuous verification"
    echo "   ✅ Tamper-proof audit trail with hash chains"
    echo "   ✅ AI that never uses customer data for training"
    echo "   ✅ Real-time compliance monitoring and reporting"
    echo "   ✅ Remote rendering for sensitive document protection"
    echo "   ✅ Enterprise-grade incident response and monitoring"
    echo
    
    echo -e "${PURPLE}Ready to see it in action?${NC}"
    echo -e "${PURPLE}Schedule a demo: demo@lawfly.pro${NC}"
    echo -e "${PURPLE}Security questions: security@lawfly.pro${NC}"
    echo
    echo -e "${GREEN}The future of legal tech is secure by design. 🚀${NC}"
}

# Run the demo
main "$@"