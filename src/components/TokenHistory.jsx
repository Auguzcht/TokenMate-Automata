import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiTrash2, FiCheck } from 'react-icons/fi';
import { glowStyles, containerVariants, itemVariants, gradientAnimation } from '../utils/styles';
import { useTokenizer } from '../context/TokenizerContext';

const TokenHistory = () => {
  const { tokenHistory, clearHistory } = useTokenizer();

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                 hover:border-[#EC4899]/30 transition-all duration-300 shadow-lg h-[400px] flex flex-col"
      style={glowStyles}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.h3 
          className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                     from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
          style={gradientAnimation}
        >
          <div className="flex items-center gap-2">
            <FiClock className="text-[#EC4899]" />
            Token History
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#0D1117]/50 text-gray-400/80">
              {tokenHistory.length}
            </span>
          </div>
        </motion.h3>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={clearHistory}
          className="p-2 text-gray-400 hover:text-[#EC4899] transition-colors rounded-lg"
          disabled={tokenHistory.length === 0}
        >
          <FiTrash2 size={18} />
        </motion.button>
      </div>

      {/* Enhanced History List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-grow space-y-2 overflow-y-auto custom-scrollbar pr-2"
      >
        <AnimatePresence mode="popLayout">
          {tokenHistory.length > 0 ? (
            tokenHistory.map((entry, index) => (
              <motion.div
                key={entry.timestamp.getTime()}
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group"
              >
                <div className="mb-2 text-xs text-gray-500/60">
                  {formatTime(entry.timestamp)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.tokens.map((token, tokenIndex) => (
                    <motion.div
                      key={tokenIndex}
                      className="flex flex-wrap items-start gap-2 p-2 bg-[#0D1117]/80 rounded-lg
                                 border border-transparent hover:border-[#EC4899]/20 
                                 transition-all duration-300 backdrop-blur-sm
                                 max-w-full"
                    >
                      <span className="text-gray-200 font-mono break-all">{token.value}</span>
                      <span className="text-xs text-gray-500/80 px-2 py-0.5 bg-[#1A1F2B]/50 rounded-md 
                                      whitespace-nowrap">
                        {token.type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-gray-500/60"
            >
              <span className="text-lg mb-2">No history yet</span>
              <span className="text-sm">Previous tokens will appear here</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TokenHistory;