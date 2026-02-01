import { useState } from 'react';
import aiService from '../../services/ai.service';

const SymptomForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await aiService.checkSymptoms(symptoms);
      setResult(res);
    } catch (error) {
      setResult({ error: 'Error checking symptoms' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms in detail (e.g., headache, fever, cough)"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Analyze Symptoms
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
              <div className="grid gap-2">
                <p><span className="font-medium">Possible Condition:</span> {result.possible_condition}</p>
                <p><span className="font-medium">Recommended Doctor:</span> {result.recommended_doctor_type}</p>
                <p><span className="font-medium">Urgency Level:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    result.urgency_level === 'high' ? 'bg-red-100 text-red-800' :
                    result.urgency_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {result.urgency_level}
                  </span>
                </p>
                <p><span className="font-medium">Next Steps:</span> {result.next_steps}</p>
                <p className="text-sm text-gray-600 italic border-t pt-2 mt-2">{result.legal_disclaimer}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomForm;