import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck, FiList } from 'react-icons/fi';
import { glowStyles, containerVariants, itemVariants, gradientAnimation } from '../utils/styles';
import { useTokenizer } from '../context/TokenizerContext';

// Add this helper function at the top of the file
const getEmojiFromUnicode = (unicode) => {
  try {
    const codePoint = parseInt(unicode.replace('U+', ''), 16);
    return String.fromCodePoint(codePoint);
  } catch (e) {
    return unicode;
  }
};

const TokenDisplay = () => {
  const { tokens, currentState } = useTokenizer();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('detailed');

  // Updated token color mapping based on final states
  const tokenColors = {
    WORD: 'bg-purple-500',
    PHRASE: 'bg-blue-500',
    SENTENCE: 'bg-green-500',
    NUMBER: 'bg-yellow-500',
    URL: 'bg-red-500',
    HASHTAG: 'bg-pink-500',
    MENTION: 'bg-indigo-500',
    EMOTICON: 'bg-orange-500',
    EMAIL: 'bg-cyan-500',
    PUNCTUATION: 'bg-gray-500',
    ERROR: 'bg-red-700',
    unknown: 'bg-gray-700',
    EMOJI: 'bg-teal-500' // Add color for EMOJI category
  };

  // Categorize tokens based on their final states
  const categorizedTokens = useMemo(() => {
    const categories = {
      WORD: [],
      PHRASE: [],
      SENTENCE: [],
      NUMBER: [],
      URL: [],
      HASHTAG: [],
      MENTION: [],
      EMOTICON: [],
      EMOJI: [], // Added EMOJI category
      EMAIL: [],
      PUNCTUATION: [],
      ERROR: []
    };

    tokens.forEach(token => {
      // First check token type
      if (token.type === 'PHRASE') {
        categories.PHRASE.push(token);
        return;
      }
      if (token.type === 'EMOJI') {
        categories.EMOJI.push(token);
        return;
      }

      // Then check final states for other tokens
      const finalState = token.transitions?.[token.transitions.length - 1]?.to;
      switch (finalState) {
        case '2':
          categories.WORD.push(token);
          break;
        case '4':
          categories.PHRASE.push(token);
          break;
        case '7':
          categories.SENTENCE.push(token);
          break;
        case '10':
          categories.NUMBER.push(token);
          break;
        case '22':
          categories.URL.push(token);
          break;
        case '31':
          categories.HASHTAG.push(token);
          break;
        case '41':
          categories.MENTION.push(token);
          break;
        case '52':
          categories.EMOTICON.push(token);
          break;
        case '61': // Added EMOJI state
          categories.EMOJI.push(token);
          break;
        case '75':
          categories.EMAIL.push(token);
          break;
        case '8':
          categories.PUNCTUATION.push(token);
          break;
        case '99':
          categories.ERROR.push(token);
          break;
        default:
          // Check token.type as fallback
          if (token.type && categories[token.type]) {
            categories[token.type].push(token);
          }
          break;
      }
    });

    return categories;
  }, [tokens]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                 hover:border-[#EC4899]/30 transition-all duration-300 shadow-lg h-[600px] flex flex-col"
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
            Tokens
          </div>
        </motion.h3>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(prev => prev === 'detailed' ? 'compact' : 'detailed')}
            className="p-2 text-gray-400 hover:text-[#EC4899] transition-colors rounded-lg"
          >
            <FiList size={18} />
          </motion.button>
          <div className="px-3 py-1 bg-[#0D1117]/50 rounded-full text-sm text-gray-400/80 
                        backdrop-blur-sm border border-[#EC4899]/10">
            {tokens.length} tokens found
          </div>
        </div>
      </div>

      {/* Enhanced Tokens Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-grow space-y-4 overflow-y-auto custom-scrollbar pr-2"
      >
        <AnimatePresence mode="sync">
          {Object.entries(categorizedTokens).map(([category, categoryTokens]) => 
            categoryTokens.length > 0 && (
              <motion.div
                key={category}
                variants={itemVariants}
                className="space-y-2"
              >
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  {category} ({categoryTokens.length})
                </h4>
                {categoryTokens.map((token, index) => (
                  <motion.div
                    key={`${category}-${index}`}
                    className={`group flex items-center justify-between p-3 bg-[#0D1117]/80 rounded-lg
                             border border-transparent hover:border-[#EC4899]/20 transition-all duration-300
                             backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full ${tokenColors[category]} opacity-80`} />
                      <div className="flex flex-col">
                        <span className="font-mono text-gray-200">
                          {category === 'EMOJI' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{getEmojiFromUnicode(token.value)}</span>
                              <span className="text-sm text-gray-400">({token.value})</span>
                            </div>
                          ) : (
                            token.value
                          )}
                        </span>
                        {viewMode === 'detailed' && (
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-gray-500/80 px-2 py-0.5 bg-[#1A1F2B]/50 rounded-md">
                              line {token.line}
                            </span>
                            <span className="text-xs text-gray-500/80 px-2 py-0.5 bg-[#1A1F2B]/50 rounded-md">
                              pos {token.position}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          )}

          {tokens.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-gray-500/60"
            >
              <span className="text-lg mb-2">No tokens yet</span>
              <span className="text-sm">Enter some text to tokenize</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TokenDisplay;