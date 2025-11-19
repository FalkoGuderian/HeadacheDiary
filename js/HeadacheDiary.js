const HeadacheDiary = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotError, setChatbotError] = useState('');

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: getCurrentDate(),
    time: getCurrentTime(),
    duration: '',
    intensity: '',
    symptoms: '',
    stressSituation: '',
    familyInteraction: '',
    stressSigns: '',
    sleepHours: '',
    sleepQuality: '',
    dailyActivity: '',
    chocolateAmount: '',
    cheeseAmount: '',
    otherFoods: '',
    waterIntake: '',
    dehydrationSigns: '',
    snacks: '',
    mealRoutine: '',
    screenTime: '',
    allergies: '',
    medicalTests: '',
    environmentChanges: ''
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [analysisError, setAnalysisError] = useState('');

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('headacheEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('headacheEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const intensityMap = {
        'leicht': 0,
        'mittel': 1,
        'stark': 2
      };
      const data = entries.map(entry => ({
        x: `${entry.date} ${entry.time}`,
        y: intensityMap[entry.intensity?.toLowerCase()] || 0,
        entry: entry
      }));
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Kopfschmerzintensität',
            data: data,
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            tension: 0.1,
            pointRadius: 5,
            pointHoverRadius: 8
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                parser: 'yyyy-MM-dd HH:mm',
                tooltipFormat: 'dd.MM.yyyy HH:mm',
                displayFormats: {
                  day: 'dd.MM.yyyy'
                }
              },
              title: {
                display: true,
                text: 'Datum'
              },
              ticks: {
                source: 'data',
                callback: function(value, index, values) {
                  const date = new Date(value);
                  return date.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  });
                }
              }
            },
            y: {
              min: 0,
              max: 2,
              ticks: {
                stepSize: 1,
                callback: (value) => {
                  const labels = ['Leicht', 'Mittel', 'Stark'];
                  return labels[value] || value;
                }
              },
              title: {
                display: true,
                text: 'Intensität'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const entry = context.raw.entry;
                  return [
                    `Datum: ${entry.date}`,
                    `Uhrzeit: ${entry.time}`,
                    `Dauer: ${entry.duration || 'N/A'} Minuten`,
                    `Intensität: ${entry.intensity || 'N/A'}`,
                    `Begleitsymptome: ${entry.symptoms || 'N/A'}`,
                    `Stresssituation: ${entry.stressSituation || 'N/A'}`,
                    `Interaktion mit Familie: ${entry.familyInteraction || 'N/A'}`,
                    `Stressanzeichen: ${entry.stressSigns || 'N/A'}`,
                    `Schlafstunden: ${entry.sleepHours || 'N/A'}`,
                    `Schlafqualität: ${entry.sleepQuality || 'N/A'}`,
                    `Tägliche Aktivität: ${entry.dailyActivity || 'N/A'}`,
                    `Schokoladenmenge: ${entry.chocolateAmount || 'N/A'}`,
                    `Käsemenge: ${entry.cheeseAmount || 'N/A'}`,
                    `Andere Lebensmittel: ${entry.otherFoods || 'N/A'}`,
                    `Wasseraufnahme: ${entry.waterIntake || 'N/A'}`,
                    `Dehydrationszeichen: ${entry.dehydrationSigns || 'N/A'}`,
                    `Snacks: ${entry.snacks || 'N/A'}`,
                    `Mahlzeitenroutine: ${entry.mealRoutine || 'N/A'}`,
                    `Bildschirmzeit: ${entry.screenTime || 'N/A'}`,
                    `Allergien: ${entry.allergies || 'N/A'}`,
                    `Medizinische Tests: ${entry.medicalTests || 'N/A'}`,
                    `Umgebungsveränderungen: ${entry.environmentChanges || 'N/A'}`
                  ];
                }
              }
            }
          }
        }
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [entries]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    setAnalysisError('');
    setChatbotError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({
      date: getCurrentDate(),
      time: getCurrentTime(),
      duration: '',
      intensity: '',
      symptoms: '',
      stressSituation: '',
      familyInteraction: '',
      stressSigns: '',
      sleepHours: '',
      sleepQuality: '',
      dailyActivity: '',
      chocolateAmount: '',
      cheeseAmount: '',
      otherFoods: '',
      waterIntake: '',
      dehydrationSigns: '',
      snacks: '',
      mealRoutine: '',
      screenTime: '',
      allergies: '',
      medicalTests: '',
      environmentChanges: ''
    });
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleShowDetails = (index) => {
    setSelectedEntry(entries[index]);
  };

  const handleAdoptEntry = (index) => {
    const entry = entries[index];
    setFormData({
      ...entry,
      date: getCurrentDate(),
      time: getCurrentTime()
    });
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  const downloadCSV = () => {
    const headers = [
      'Datum', 'Uhrzeit', 'Dauer', 'Intensität', 'Begleitsymptome',
      'Stresssituation', 'Interaktion Familie', 'Stressanzeichen',
      'Schlafstunden', 'Schlafqualität', 'Tägliche Aktivität',
      'Schokoladenmenge', 'Käsemenge', 'Andere Lebensmittel',
      'Wasseraufnahme', 'Dehydrationszeichen', 'Snacks',
      'Mahlzeitenroutine', 'Bildschirmzeit', 'Allergien',
      'Medizinische Tests', 'Umgebungsveränderungen'
    ];
    const rows = entries.map(entry => [
      entry.date, entry.time, entry.duration, entry.intensity, entry.symptoms,
      entry.stressSituation, entry.familyInteraction, entry.stressSigns,
      entry.sleepHours, entry.sleepQuality, entry.dailyActivity,
      entry.chocolateAmount, entry.cheeseAmount, entry.otherFoods,
      entry.waterIntake, entry.dehydrationSigns, entry.snacks,
      entry.mealRoutine, entry.screenTime, entry.allergies,
      entry.medicalTests, entry.environmentChanges
    ].map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'headache-diary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').slice(1).filter(row => row.trim());
      const newEntries = rows.map(row => {
        const [
          date, time, duration, intensity, symptoms,
          stressSituation, familyInteraction, stressSigns,
          sleepHours, sleepQuality, dailyActivity,
          chocolateAmount, cheeseAmount, otherFoods,
          waterIntake, dehydrationSigns, snacks,
          mealRoutine, screenTime, allergies,
          medicalTests, environmentChanges
        ] = row.split(',').map(field => field.replace(/^"|"$/g, '').replace(/""/g, '"'));
        return {
          date, time, duration, intensity, symptoms,
          stressSituation, familyInteraction, stressSigns,
          sleepHours, sleepQuality, dailyActivity,
          chocolateAmount, cheeseAmount, otherFoods,
          waterIntake, dehydrationSigns, snacks,
          mealRoutine, screenTime, allergies,
          medicalTests, environmentChanges
        };
      });
      setEntries([...entries, ...newEntries.filter(entry => entry.date && entry.time)]);
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  const analyzeWithOpenAI = async () => {
    if (!apiKey) {
      setAnalysisError('Bitte geben Sie einen gültigen OpenAI API-Schlüssel ein.');
      return;
    }

    if (entries.length === 0) {
      setAnalysisError('Keine Einträge vorhanden, um eine Analyse durchzuführen.');
      return;
    }

    setAnalysisError('');
    setAnalysisResult('Analyse läuft...');

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

    const prompt = `
Sie sind ein medizinischer Experte für Kopfschmerzen. Analysieren Sie die folgende Historie von Kopfschmerzeinträgen eines Patienten. Identifizieren Sie die wahrscheinlichste Ursache (oder Ursachen) für die Kopfschmerzen basierend auf den Daten (z. B. Stress, Ernährung, Schlaf, Dehydration, Umgebungsveränderungen). Geben Sie konkrete Maßnahmen zur Verhinderung der Kopfschmerzen an, die auf den identifizierten Ursachen basieren. Die Antwort sollte klar, prägnant und in deutscher Sprache formuliert sein. Geben Sie die Antwort in folgendem Format zurück:

**Wahrscheinlichste Ursache(n):**
- [Ursache 1]
- [Ursache 2, falls zutreffend]

**Empfohlene Maßnahmen:**
- [Maßnahme 1]
- [Maßnahme 2]
- ...

**Hinweis:** Falls die Daten nicht ausreichen, um eine spezifische Ursache zu identifizieren, geben Sie die wahrscheinlichsten Möglichkeiten an und empfehlen Sie allgemeine Maßnahmen sowie weitere Untersuchungen.

**Historie:**
${historyText}
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const result = data.choices[0].message.content;
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisError(`Fehler bei der Analyse: ${error.message}`);
      setAnalysisResult('');
    }
  };

  const downloadAnalysis = () => {
    if (!analysisResult) {
      setAnalysisError('Keine Analyse verfügbar zum Herunterladen.');
      return;
    }

    const blob = new Blob([analysisResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'headache-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐻Mateos Kopfschmerztagebuch</h1>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Neuer Eintrag</h2>
          <button
            type="button"
            onClick={() => setChatbotOpen(true)}
            className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
          >
            Eintrag mit Chatbot erstellen
          </button>
        </div>
        {chatbotError && (
          <p className="text-red-500 mb-4">{chatbotError}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">Datum</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block">Uhrzeit</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block">Dauer (in Minuten)</label>
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Intensität</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="" disabled>Wähle eine Intensität</option>
              <option value="leicht">Leicht</option>
              <option value="mittel">Mittel</option>
              <option value="stark">Stark</option>
            </select>
          </div>
          <div>
            <label className="block">Begleitsymptome (z.B. Übelkeit, kein Brille, Lichtempfindlichkeit)</label>
            <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Stresssituation (z.B. Streit mit Bruder)</label>
            <input type="text" name="stressSituation" value={formData.stressSituation} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Interaktion mit Familie (z.B. Reaktion auf Familiensituation)</label>
            <input type="text" name="familyInteraction" value={formData.familyInteraction} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Stressanzeichen (z.B. Angst, Überforderung)</label>
            <input type="text" name="stressSigns" value={formData.stressSigns} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Schlafstunden pro Nacht</label>
            <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Schlafqualität (z.B. unruhig, häufiges Aufwachen)</label>
            <input type="text" name="sleepQuality" value={formData.sleepQuality} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Tägliche Aktivität (z.B. Bewegung im Freien)</label>
            <input type="text" name="dailyActivity" value={formData.dailyActivity} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Schokoladenmenge (z.B. Anzahl Kekse)</label>
            <input type="text" name="chocolateAmount" value={formData.chocolateAmount} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Käsemenge</label>
            <input type="text" name="cheeseAmount" value={formData.cheeseAmount} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Andere Lebensmittel</label>
            <input type="text" name="otherFoods" value={formData.otherFoods} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Wasseraufnahme (z.B. Gläser pro Tag)</label>
            <input type="text" name="waterIntake" value={formData.waterIntake} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Dehydrationszeichen (z.B. dunkler Urin)</label>
            <input type="text" name="dehydrationSigns" value={formData.dehydrationSigns} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Snacks am Abend</label>
            <input type="text" name="snacks" value={formData.snacks} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Mahlzeitenroutine (z.B. fest oder unstrukturiert)</label>
            <input type="text" name="mealRoutine" value={formData.mealRoutine} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Bildschirmzeit (Stunden pro Tag)</label>
            <input type="text" name="screenTime" value={formData.screenTime} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Allergien/Unverträglichkeiten</label>
            <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Medizinische Tests (z.B. Bluttests)</label>
            <input type="text" name="medicalTests" value={formData.medicalTests} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block">Umgebungsveränderungen (z.B. neuer Kindergarten)</label>
            <input type="text" name="environmentChanges" value={formData.environmentChanges} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Eintrag speichern</button>
      </form>

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <Chatbot
          formData={formData}
          setFormData={setFormData}
          apiKey={apiKey}
          setChatbotOpen={setChatbotOpen}
          setChatbotError={setChatbotError}
        />
      )}

      {/* Empfehlungen */}
      <div className="mt-8 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold">Empfehlungen</h2>
        <ul className="list-disc pl-5">
          <li>Führe dieses Kopfschmerztagebuch regelmäßig, um Muster zu erkennen.</li>
          <li>Verbessere die Schlafhygiene: Feste Schlafenszeit und mehr Bewegung im Freien (10–11 Stunden Schlaf pro Nacht).</li>
          <li>Passe die Ernährung an: Reduziere Schokolade und Käse vorübergehend, um mögliche Auslöser zu testen.</li>
          <li>Überwache die Flüssigkeitszufuhr: Stelle sicher, dass der Junge ca. 1–1,5 Liter Wasser pro Tag trinkt.</li>
          <li>Konsultiere einen Kinderarzt/Neurologen, um andere Ursachen auszuschließen.</li>
        </ul>
      </div>

      {/* Einträge anzeigen */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Gespeicherte Einträge</h2>
        <div className="flex space-x-4 mb-4">
          <button onClick={downloadCSV} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Download als CSV</button>
          <label className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 cursor-pointer">
            CSV importieren
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>
        </div>
        {entries.length > 0 ? (
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Intensität über Zeit</h3>
              <canvas ref={chartRef} className="max-h-[400px]"></canvas>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">OpenAI-Analyse</h3>
              <div className="flex space-x-4 mb-4">
                <input
                  type="password"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="OpenAI API-Schlüssel"
                  className="p-2 border rounded w-64"
                />
                <button
                  onClick={analyzeWithOpenAI}
                  className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
                >
                  Analyse mit OpenAI
                </button>
                {analysisResult && (
                  <button
                    onClick={downloadAnalysis}
                    className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
                  >
                    Analyse herunterladen
                  </button>
                )}
              </div>
              {analysisError && (
                <p className="text-red-500 mb-4">{analysisError}</p>
              )}
              {analysisResult && (
                <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                  {analysisResult}
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Datum</th>
                    <th className="border p-2">Uhrzeit</th>
                    <th className="border p-2">Dauer</th>
                    <th className="border p-2">Intensität</th>
                    <th className="border p-2">Begleitsymptome</th>
                    <th className="border p-2">Stresssituation</th>
                    <th className="border p-2">Interaktion Familie</th>
                    <th className="border p-2">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={index}>
                      <td className="border p-2">{entry.date}</td>
                      <td className="border p-2">{entry.time}</td>
                      <td className="border p-2">{entry.duration}</td>
                      <td className="border p-2">{entry.intensity}</td>
                      <td className="border p-2">{entry.symptoms}</td>
                      <td className="border p-2">{entry.stressSituation}</td>
                      <td className="border p-2">{entry.familyInteraction}</td>
                      <td className="border p-2 flex space-x-2">
                        <button
                          onClick={() => handleShowDetails(index)}
                          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleAdoptEntry(index)}
                          className="bg-purple-500 text-white p-1 rounded hover:bg-purple-600"
                        >
                          Übernehmen
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>Keine Einträge vorhanden.</p>
        )}
      </div>

      {/* Modal für vollständige Details */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Eintragsdetails</h3>
            <div className="grid grid-cols-1 gap-4">
              <div><strong>Datum:</strong> {selectedEntry.date}</div>
              <div><strong>Uhrzeit:</strong> {selectedEntry.time}</div>
              <div><strong>Dauer (Minuten):</strong> {selectedEntry.duration}</div>
              <div><strong>Intensität:</strong> {selectedEntry.intensity}</div>
              <div><strong>Begleitsymptome:</strong> {selectedEntry.symptoms}</div>
              <div><strong>Stresssituation:</strong> {selectedEntry.stressSituation}</div>
              <div><strong>Interaktion mit Familie:</strong> {selectedEntry.familyInteraction}</div>
              <div><strong>Stressanzeichen:</strong> {selectedEntry.stressSigns}</div>
              <div><strong>Schlafstunden pro Nacht:</strong> {selectedEntry.sleepHours}</div>
              <div><strong>Schlafqualität:</strong> {selectedEntry.sleepQuality}</div>
              <div><strong>Tägliche Aktivität:</strong> {selectedEntry.dailyActivity}</div>
              <div><strong>Schokoladenmenge:</strong> {selectedEntry.chocolateAmount}</div>
              <div><strong>Käsemenge:</strong> {selectedEntry.cheeseAmount}</div>
              <div><strong>Andere Lebensmittel:</strong> {selectedEntry.otherFoods}</div>
              <div><strong>Wasseraufnahme:</strong> {selectedEntry.waterIntake}</div>
              <div><strong>Dehydrationszeichen:</strong> {selectedEntry.dehydrationSigns}</div>
              <div><strong>Snacks am Abend:</strong> {selectedEntry.snacks}</div>
              <div><strong>Mahlzeitenroutine:</strong> {selectedEntry.mealRoutine}</div>
              <div><strong>Bildschirmzeit:</strong> {selectedEntry.screenTime}</div>
              <div><strong>Allergien/Unverträglichkeiten:</strong> {selectedEntry.allergies}</div>
              <div><strong>Medizinische Tests:</strong> {selectedEntry.medicalTests}</div>
              <div><strong>Umgebungsveränderungen:</strong> {selectedEntry.environmentChanges}</div>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
