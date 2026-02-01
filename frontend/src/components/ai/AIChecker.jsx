import { useState } from 'react';
import aiService from '../../services/ai.service';

const AIChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await aiService.checkSymptoms(symptoms);
      setResult(res);
    } catch (err) {
      setError(err.error || 'Failed to analyze symptoms. Please try again.');
      console.error('Symptom check error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">AI Symptom Checker</h2>
        
        <form onSubmit={handleAnalyze} className="space-y-4">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms in detail (e.g., I have fever and cold, headache, sore throat, etc.)"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Possible Condition</p>
              <p className="text-lg font-semibold text-blue-900 mt-1">
                {result.possible_condition || 'Analyzing...'}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Recommended Doctor</p>
              <p className="text-lg font-semibold text-green-900 mt-1">
                {result.recommended_doctor_type || 'General Practitioner'}
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Urgency Level</p>
              <p className={`text-lg font-semibold mt-1 px-3 py-1 rounded-full inline-block ${
                result.urgency_level === 'high' ? 'bg-red-100 text-red-800' :
                result.urgency_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {result.urgency_level || 'Medium'}
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium">Next Steps</p>
              <p className="text-lg font-semibold text-purple-900 mt-1">
                {result.next_steps || 'Consult a healthcare provider'}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <p className="font-semibold text-gray-900 mb-2">Detailed Analysis:</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {result.analysis || 'Processing analysis...'}
            </p>
          </div>

          {result.recommendations && result.recommendations.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.legal_disclaimer && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800 italic">
                ⚠️ {result.legal_disclaimer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIChecker;