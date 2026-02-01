import SymptomForm from '../components/patient/SymptomForm';
import AICheckerResult from '../components/patient/AICheckerResult';
import DoctorRecommendation from '../components/patient/DoctorRecommendation';
import HealthTimeline from '../components/patient/HealthTimeline';
import VitalsInput from '../components/patient/VitalsInput';

const PatientPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Patient Portal</h1>
          <p className="text-xl text-gray-600">Manage your health with AI assistance and personalized care.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">AI Symptom Checker</h2>
            <SymptomForm />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Health Timeline</h2>
            <HealthTimeline />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Vitals Input</h2>
            <VitalsInput />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Doctor Recommendations</h2>
            <DoctorRecommendation recommendation="Please consult a general physician for a thorough check-up." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;