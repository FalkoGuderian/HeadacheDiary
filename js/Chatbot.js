const Chatbot = ({ formData, setFormData, apiKey, setChatbotOpen, setChatbotError }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] = useState({});

  // Fragenstruktur in Gruppen
  const questions = [
    {
      prompt: "Wann hatten Sie den Kopfschmerz? Bitte geben Sie Datum (z.B. 2025-05-18), Uhrzeit (z.B. 14:30), Dauer in Minuten und Intensität (leicht, mittel oder stark) an.",
      fields: ['date', 'time', 'duration', 'intensity']
    },
    {
      prompt: "Welche Begleitsymptome hatten Sie (z.B. Übelkeit, Lichtempfindlichkeit)? Gab es eine Stresssituation (z.B. Streit mit Bruder)? Wie war die Interaktion mit der Familie (z.B. Reaktion auf Familiensituation)? Gab es Stressanzeichen (z.B. Angst, Überforderung)?",
      fields: ['symptoms', 'stressSituation', 'familyInteraction', 'stressSigns']
    },
    {
      prompt: "Wie viele Stunden haben Sie geschlafen? Wie war die Schlafqualität (z.B. unruhig, häufiges Aufwachen)? Welche tägliche Aktivität haben Sie ausgeübt (z.B. Bewegung im Freien)?",
      fields: ['sleepHours', 'sleepQuality', 'dailyActivity']
    },
    {
      prompt: "Wie viel Schokolade (z.B. Anzahl Kekse) und Käse haben Sie gegessen? Welche anderen Lebensmittel haben Sie konsumiert? Wie viel Wasser haben Sie getrunken (z.B. Gläser pro Tag)? Gab es Dehydrationszeichen (z.B. dunkler Urin)? Welche Snacks haben Sie am Abend gegessen? Wie war Ihre Mahlzeitenroutine (z.B. fest oder unstrukturiert)?",
      fields: ['chocolateAmount', 'cheeseAmount', 'otherFoods', 'waterIntake', 'dehydrationSigns', 'snacks', 'mealRoutine']
    },
    {
      prompt: "Wie viel Bildschirmzeit hatten Sie (Stunden pro Tag)? Haben Sie Allergien oder Unverträglichkeiten? Gab es medizinische Tests (z.B. Bluttests)? Gab es Umgebungsveränderungen (z.B. neuer Kindergarten)?",
      fields: ['screenTime', 'allergies', 'medicalTests', 'environmentChanges']
    }
  ];

  // Startnachricht
  useEffect(() => {
    if (currentStep === 0) {
      setMessages([{ text: questions[0].prompt, isBot: true }]);
    }
  }, []);

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Füge Benutzernachricht hinzu
    setMessages([...messages, { text: userInput, isBot: false }]);
    const currentQuestion = questions[currentStep];

    // Sende Eingabe an OpenAI, um Antworten in Felder aufzuteilen
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: `Sie sind ein Assistent, der Benutzereingaben analysiert und in strukturierte Daten für ein Kopfschmerztagebuch umwandelt. Teilen Sie die Eingabe in die folgenden Felder auf: ${currentQuestion.fields.join(', ')}. Geben Sie die Antwort im JSON-Format zurück, z.B. { "field1": "value1", "field2": "value2" }. Wenn ein Feld nicht eindeutig ausgefüllt werden kann, lassen Sie es leer ("").`
            },
            { role: 'user', content: userInput }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.choices[0].message.content);

      // Aktualisiere gesammelte Daten
      setCollectedData({ ...collectedData, ...parsedData });

      // Gehe zum nächsten Schritt oder schließe den Chatbot
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setMessages([...messages, { text: userInput, isBot: false }, { text: questions[currentStep + 1].prompt, isBot: true }]);
      } else {
        // Alle Fragen beantwortet, aktualisiere Formular
        setFormData({ ...formData, ...collectedData });
        setChatbotOpen(false);
        setMessages([]);
        setCurrentStep(0);
        setCollectedData({});
      }
    } catch (error) {
      setChatbotError(`Fehler bei der Verarbeitung: ${error.message}`);
    }

    setUserInput('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Chatbot: Neuer Eintrag</h3>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded ${msg.isBot ? 'bg-blue-100' : 'bg-gray-100 text-right'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleUserInput} className="mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ihre Antwort..."
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Antwort senden
            </button>
            <button
              type="button"
              onClick={() => setChatbotOpen(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
