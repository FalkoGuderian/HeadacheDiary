/**
 * AI Prompts for the Headache Diary Application
 * This file contains all AI prompts used in the application for better maintainability
 */

/**
 * Prompt for parsing chatbot user input into structured headache diary data
 * @param {string} userInput - The user's natural language input
 * @param {Array} questions - The current set of questions being asked
 * @param {number} currentStep - The current step in the questionnaire
 * @returns {string} The formatted prompt
 */
export function getChatbotParsingPrompt(userInput, questions, currentStep) {
    const currentQuestion = questions[currentStep];
    return `Sie sind ein Assistent, der Benutzereingaben analysiert und in strukturierte Daten für ein Kopfschmerztagebuch umwandelt. Teilen Sie die Eingabe in die folgenden Felder auf: ${currentQuestion.fields.join(', ')}. Geben Sie die Antwort im JSON-Format zurück, z.B. { "field1": "value1", "field2": "value2" }. Wenn ein Feld nicht eindeutig ausgefüllt werden kann, lassen Sie es leer ("").

Benutzereingabe: "${userInput}"

Felder: ${currentQuestion.fields.join(', ')}

Antworten Sie nur mit dem JSON-Objekt, ohne zusätzlichen Text.`;
}

/**
 * Prompt for analyzing headache entries to identify patterns and causes
 * @param {Array} entries - Array of headache diary entries
 * @returns {string} The formatted prompt
 */
export function getHeadacheAnalysisPrompt(entries) {
    const historyText = entries.map((entry, index) => {
        return `Eintrag ${index + 1}:
- Datum: ${entry.date}
- Uhrzeit: ${entry.time}
- Dauer: ${entry.duration || 'N/A'} Minuten
- Intensität: ${entry.intensity || 'N/A'}
- Begleitsymptome: ${entry.symptoms || 'N/A'}
- Stresssituation: ${entry.stressSituation || 'N/A'}
- Interaktion mit Familie: ${entry.familyInteraction || 'N/A'}
- Stressanzeichen: ${entry.stressSigns || 'N/A'}
- Schlafstunden: ${entry.sleepHours || 'N/A'}
- Schlafqualität: ${entry.sleepQuality || 'N/A'}
- Tägliche Aktivität: ${entry.dailyActivity || 'N/A'}
- Schokoladenmenge: ${entry.chocolateAmount || 'N/A'}
- Käsemenge: ${entry.cheeseAmount || 'N/A'}
- Andere Lebensmittel: ${entry.otherFoods || 'N/A'}
- Wasseraufnahme: ${entry.waterIntake || 'N/A'}
- Dehydrationszeichen: ${entry.dehydrationSigns || 'N/A'}
- Snacks: ${entry.snacks || 'N/A'}
- Mahlzeitenroutine: ${entry.mealRoutine || 'N/A'}
- Bildschirmzeit: ${entry.screenTime || 'N/A'}
- Allergien: ${entry.allergies || 'N/A'}
- Medizinische Tests: ${entry.medicalTests || 'N/A'}
- Umgebungsveränderungen: ${entry.environmentChanges || 'N/A'}\n`;
    }).join('\n');

    return `Sie sind ein medizinischer Experte für Kopfschmerzen. Analysieren Sie die folgende Historie von Kopfschmerzeinträgen eines Patienten. Identifizieren Sie die wahrscheinlichste Ursache (oder Ursachen) für die Kopfschmerzen basierend auf den Daten (z. B. Stress, Ernährung, Schlaf, Dehydration, Umgebungsveränderungen). Geben Sie konkrete Maßnahmen zur Verhinderung der Kopfschmerzen an, die auf den identifizierten Ursachen basieren. Die Antwort sollte klar, prägnant und in deutscher Sprache formuliert sein. Geben Sie die Antwort in folgendem Format zurück:

**Wahrscheinlichste Ursache(n):**
- [Ursache 1]
- [Ursache 2, falls zutreffend]

**Empfohlene Maßnahmen:**
- [Maßnahme 1]
- [Maßnahme 2]
- ...

**Hinweis:** Falls die Daten nicht ausreichen, um eine spezifische Ursache zu identifizieren, geben Sie die wahrscheinlichsten Möglichkeiten an und empfehlen Sie allgemeine Maßnahmen sowie weitere Untersuchungen.

**Historie:**
${historyText}`;
}

/**
 * Default model configuration for AI requests
 */
export const AI_CONFIG = {
    model: 'x-ai/grok-4-fast',
    temperature: 0.7,
    maxTokens: {
        chatbotParsing: 500,
        headacheAnalysis: 2000
    }
};

/**
 * API endpoint for AI requests
 */
export const AI_API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
