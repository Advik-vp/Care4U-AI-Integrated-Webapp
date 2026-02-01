#!/bin/bash

echo "============================================"
echo "CARE4U AI Service Initialization"
echo "============================================"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your AI API keys:"
    echo "   - OPENAI_API_KEY for GPT-3.5/GPT-4"
    echo "   - ANTHROPIC_API_KEY for Claude"
    echo ""
else
    echo "✓ .env file exists"
fi

# Check for AI API keys
echo "Checking AI provider configuration..."
echo ""

source .env 2>/dev/null || true

HAS_OPENAI=false
HAS_ANTHROPIC=false

if [ ! -z "$OPENAI_API_KEY" ] && [ "$OPENAI_API_KEY" != "your-openai-api-key" ]; then
    echo "✓ OpenAI API key configured"
    HAS_OPENAI=true
else
    echo "✗ OpenAI API key not configured"
fi

if [ ! -z "$ANTHROPIC_API_KEY" ] && [ "$ANTHROPIC_API_KEY" != "your-anthropic-api-key-here" ]; then
    echo "✓ Anthropic API key configured"
    HAS_ANTHROPIC=true
else
    echo "✗ Anthropic API key not configured"
fi

echo ""

if [ "$HAS_OPENAI" = false ] && [ "$HAS_ANTHROPIC" = false ]; then
    echo "⚠️  WARNING: No AI providers configured!"
    echo ""
    echo "The application will work with limited functionality."
    echo "AI features (chat, symptom checker) will show fallback messages."
    echo ""
    echo "To enable AI features:"
    echo "1. Get an API key from:"
    echo "   • OpenAI: https://platform.openai.com/api-keys"
    echo "   • Anthropic: https://console.anthropic.com/"
    echo "2. Add it to your .env file"
    echo "3. Restart the backend server"
    echo ""
else
    echo "✓ AI services ready!"
    echo ""
    echo "Configured providers:"
    [ "$HAS_OPENAI" = true ] && echo "  • OpenAI (GPT-3.5/GPT-4)"
    [ "$HAS_ANTHROPIC" = true ] && echo "  • Anthropic (Claude)"
    echo ""
fi

echo "============================================"
echo "AI Initialization Complete"
echo "============================================"
echo ""
echo "The application supports running anywhere:"
echo "  • With AI keys: Full AI-powered features"
echo "  • Without AI keys: Basic features with fallback messages"
echo "  • Mixed providers: Automatically uses available provider"
echo ""
echo "Test AI availability: GET http://localhost:5000/api/ai/health"
echo ""
