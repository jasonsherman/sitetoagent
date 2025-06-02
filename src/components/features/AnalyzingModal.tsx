import { motion } from 'framer-motion';
import { Bot, FileText, MessageSquare, BarChart4, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const steps = [
  { id: 'scraping', icon: Bot },
  { id: 'business_overview', icon: Brain },
  { id: 'services_products', icon: FileText },
  { id: 'unique_selling_points', icon: Sparkles },
  { id: 'brand_voice', icon: MessageSquare },
  { id: 'sales_qa', icon: BarChart4 },
];

function getStepIndex(stepId: string) {
  return steps.findIndex((s) => s.id === stepId);
}

const AnalyzingModal = ({ url, progress, message, step }: { url: string, progress: number, message: string, step: string }) => {
  const { t } = useTranslation();
  const currentStepIndex = getStepIndex(step);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('analyzing.title', { url })}</h3>
          <p className="text-gray-600">{t('analyzing.subtitle')}</p>
        </div>

        <div className="mb-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-right text-sm text-gray-500 mt-1">
            {Math.round(progress)}%
          </p>
        </div>

        {message && (
          <p className="text-center text-sm text-gray-500 mb-2">{message}</p>
        )}

        <div className="space-y-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === currentStepIndex;
            const isComplete = idx < currentStepIndex;
            return (
              <motion.div
                key={s.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isActive ? 'bg-indigo-50 text-indigo-700' :
                  isComplete ? 'text-gray-400' : 'text-gray-300'
                }`}
                animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Icon className={`h-5 w-5 ${
                    isActive ? 'text-indigo-600' :
                    isComplete ? 'text-gray-400' : 'text-gray-300'
                  }`} />
                )}
                <span className={`flex-1 ${
                  isActive ? 'font-medium' :
                  isComplete ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  {t(`analyzing.steps.${s.id}`)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyzingModal; 