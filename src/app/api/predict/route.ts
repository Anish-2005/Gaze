import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
})

export async function POST(request: NextRequest) {
    try {
        const { letters, currentMessage } = await request.json()

        if (!letters || letters.length < 2) {
            return NextResponse.json({ predictions: [] })
        }

        // Build context from gaze letters
        const letterSequence = letters.join('')
        const context = currentMessage ? `Current message: "${currentMessage}". ` : ''

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are an assistive communication word predictor for patients who communicate using eye-tracking. Given a sequence of letters the user has looked at, suggest 3-5 words they might be trying to type. The words should:
1. Be commonly used in medical/care contexts (pain, water, nurse, help, yes, no, etc.)
2. Be easy to understand for caregivers
3. Be relevant to the letters gazed at
4. Prioritize shorter, urgent words over longer ones

Return ONLY a JSON array of word strings, no explanation. Example: ["help", "water", "pain"]`
                },
                {
                    role: 'user',
                    content: `${context}Letters gazed at (in order): ${letterSequence.toUpperCase()}

Suggest 3-5 words the user might be trying to communicate. Consider common communication needs for someone with limited mobility.`
                }
            ],
            temperature: 0.7,
            max_tokens: 100,
        })

        const content = response.choices[0]?.message?.content || '[]'

        // Parse the response
        let predictions: string[] = []
        try {
            // Try to extract JSON array from response
            const jsonMatch = content.match(/\[.*\]/s)
            if (jsonMatch) {
                predictions = JSON.parse(jsonMatch[0])
            }
        } catch {
            // Fallback: split by common delimiters
            predictions = content
                .replace(/[\[\]"']/g, '')
                .split(/[,\n]/)
                .map(w => w.trim().toLowerCase())
                .filter(w => w.length > 0)
                .slice(0, 5)
        }

        return NextResponse.json({ predictions })
    } catch (error) {
        console.error('Prediction error:', error)
        // Return empty predictions on error (fallback to local)
        return NextResponse.json({ predictions: [] })
    }
}
