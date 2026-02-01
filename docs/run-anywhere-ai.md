# Run Anywhere AI - CARE4U

## Overview
CARE4U is designed to run anywhere with flexible AI provider support. The application works with or without AI services, automatically adapting to available resources.

## AI Provider Support

### Supported Providers
1. **OpenAI** (GPT-3.5, GPT-4)
   - Get API key: https://platform.openai.com/api-keys
   - Used for: Chat, Symptom Analysis, Care Plans

2. **Anthropic** (Claude)
   - Get API key: https://console.anthropic.com/
   - Used for: Chat, Symptom Analysis, Care Plans

3. **Future Support** (Planned)
   - Google AI (Gemini)
   - HuggingFace Models

### Provider Selection Logic
1. Application checks for available API keys
2. Uses first available provider automatically
3. Falls back gracefully if no provider available
4. Continues to work with basic features

## Deployment Scenarios

### Scenario 1: Full AI Features (Recommended)
```bash
# Set at least one AI provider key
OPENAI_API_KEY=sk-your-key-here
# OR
ANTHROPIC_API_KEY=your-key-here
```
**Result:** Full AI-powered features including chat, symptom checker, and care plans

### Scenario 2: No AI Keys (Basic Mode)
```bash
# No AI keys configured
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```
**Result:** Application works with fallback messages for AI features. All other features (auth, dashboards, appointments) work normally.

### Scenario 3: Mixed Environment
```bash
# Different keys in dev vs production
# Dev: Use OpenAI
# Production: Use Anthropic (more cost-effective for high volume)
```
**Result:** Flexibility to use different providers in different environments

## Quick Start

### Initialize AI Service
**Windows:**
```bash
init-ai.bat
```

**Linux/Mac:**
```bash
chmod +x init-ai.sh
./init-ai.sh
```

This script will:
- Create .env file if missing
- Check AI provider configuration
- Show status of available providers
- Provide guidance for setup

### Check AI Status
```bash
curl http://localhost:5000/api/ai/health
```

Response examples:
```json
// With AI configured
{
  "available": true,
  "provider": "openai",
  "status": "operational"
}

// Without AI configured
{
  "available": false,
  "provider": null,
  "status": "unavailable"
}
```

## Configuration

### Environment Variables

```env
# Required for AI features (at least one)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...

# Optional AI Configuration
AI_TIMEOUT=30                    # API request timeout (seconds)
AI_MAX_RETRIES=3                 # Retry attempts on failure
AI_FALLBACK_ENABLED=true         # Show fallback messages

# Feature Flags (optional)
ENABLE_AI_CHAT=true              # Enable/disable AI chat
ENABLE_SYMPTOM_CHECKER=true      # Enable/disable symptom checker
ENABLE_CARE_PLANS=true           # Enable/disable care plan generation
```

### Feature Flags for Deployment
You can disable specific AI features while keeping others:

```env
# Example: Disable chat but keep symptom checker
ENABLE_AI_CHAT=false
ENABLE_SYMPTOM_CHECKER=true
ENABLE_CARE_PLANS=false
```

## Deployment Platforms

### Docker (Any Platform)
```bash
docker-compose up -d
```
- Works with or without AI keys
- Set keys as environment variables or in .env

### Cloud Platforms

#### Heroku
```bash
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set MONGODB_URI=mongodb+srv://...
```

#### AWS ECS/EKS
- Store API keys in AWS Secrets Manager
- Reference in task definition

#### Google Cloud Run
```bash
gcloud run deploy --set-env-vars OPENAI_API_KEY=sk-...
```

#### Azure Container Instances
```bash
az container create --environment-variables OPENAI_API_KEY=sk-...
```

#### Railway/Render
- Add environment variables in dashboard
- Application auto-detects and configures

### Local Development
```bash
# Copy example and configure
cp .env.example .env
# Edit .env with your keys
./init-ai.sh  # or init-ai.bat on Windows
./start-all.sh  # or start-all.bat
```

## Graceful Degradation

The application implements intelligent fallback:

### With AI Provider
```
User: "I have a headache and fever"
AI: [Detailed symptom analysis using GPT-3.5/Claude]
```

### Without AI Provider
```
User: "I have a headache and fever"
System: "AI symptom checker is currently unavailable. 
We recommend consulting with a healthcare professional..."
[Shows helpful fallback recommendations]
```

## Testing

### Test AI Availability
```bash
# Health check
curl http://localhost:5000/api/ai/health

# Test chat (with/without AI)
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Test symptom checker
curl -X POST http://localhost:5000/api/ai/symptom-check \
  -H "Content-Type: application/json" \
  -d '{"symptoms": "headache, fever"}'
```

## Best Practices

1. **Production**: Use Anthropic (Claude) for cost-effectiveness
2. **Development**: Use OpenAI for faster iteration
3. **Testing**: Run without keys to test fallback behavior
4. **Monitoring**: Check `/api/ai/health` endpoint regularly
5. **Security**: Store API keys in environment variables, never in code
6. **Cost Control**: Set usage limits in provider dashboards

## Troubleshooting

### AI Not Working
1. Check environment variables: `echo $OPENAI_API_KEY`
2. Verify API key validity on provider dashboard
3. Check `/api/ai/health` endpoint
4. Review backend logs for errors

### Partial AI Features
- Some features may work while others don't
- Check feature flags in .env
- Verify individual API keys

### Rate Limiting
- Implement retry logic (already included)
- Use AI_TIMEOUT and AI_MAX_RETRIES settings
- Consider upgrading API tier

## Cost Optimization

- **OpenAI**: ~$0.002 per 1K tokens (GPT-3.5-turbo)
- **Anthropic**: ~$0.003 per 1K tokens (Claude-3-sonnet)
- Set `AI_TIMEOUT` lower to prevent hanging requests
- Implement caching for repeated queries (future enhancement)

## Summary

CARE4U's "Run Anywhere AI" approach means:
- ✅ Works with any AI provider (OpenAI, Anthropic, or both)
- ✅ Works without AI providers (graceful fallback)
- ✅ Automatic provider detection and selection
- ✅ Deploy anywhere (Docker, cloud, local)
- ✅ Feature flags for fine-tuned control
- ✅ Health check endpoint for monitoring
- ✅ Intelligent error handling and retries
