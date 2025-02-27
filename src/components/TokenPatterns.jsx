import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { glowStyles, containerVariants, itemVariants, gradientAnimation } from '../utils/styles';
import { useTokenizer } from '../context/TokenizerContext';

const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    scale: 0.95,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeInOut"
      },
      opacity: {
        duration: 0.2
      }
    }
  },
  visible: {
    opacity: 1,
    height: "auto",
    scale: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeInOut"
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      },
      scale: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
};

const matchItemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: i => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
      ease: "easeOut"
    }
  })
};

const TokenPatterns = () => {
  // Update the context usage to include INITIAL_STATES
  const { 
    tokens, 
    getStateName,
    matchesStateSequence,
    INITIAL_STATES, // Make sure this is being exported from TokenizerContext
    ACCEPTING_STATES, // Add this
    automaton  // This includes INITIAL_STATES if not directly available
  } = useTokenizer();

  // Use automaton.INITIAL_STATES as fallback
  const stateMap = INITIAL_STATES || automaton?.INITIAL_STATES;

  // Use automaton's ACCEPTING_STATES as fallback if needed
  const acceptingStates = ACCEPTING_STATES || automaton?.ACCEPTING_STATES;

  const [selectedPattern, setSelectedPattern] = useState(null);

  // Update patterns to only include final states
  const patterns = [
    {
      name: 'Word Pattern',
      sequence: ['2'], // VALID_WORD final state
      description: 'Matches lowercase words',
      example: 'hello'
    },
    {
      name: 'Phrase Pattern',
      sequence: ['4'], // VALID_PHRASE final state
      description: 'Matches sequences of words separated by spaces',
      example: 'hello world'
    },
    {
      name: 'Sentence Pattern',
      sequence: ['7'], // VALID_SENTENCE final state
      description: 'Matches capitalized sentences ending with punctuation',
      example: 'The quick brown fox jumps.'
    },
    {
      name: 'Number Pattern',
      sequence: ['10'], // VALID_NUMBER final state
      description: 'Matches numeric sequences',
      example: '12345'
    },
    {
      name: 'URL Pattern',
      sequence: ['22'], // URL_DOMAIN final state
      description: 'Matches web URLs',
      example: 'http://example123.com'
    },
    {
      name: 'Hashtag Pattern',
      sequence: ['31'], // VALID_HASHTAG final state
      description: 'Matches hashtag expressions',
      example: '#trending_now'
    },
    {
      name: 'Mention Pattern',
      sequence: ['41'], // VALID_MENTION final state
      description: 'Matches user mentions',
      example: '@username22'
    },
    {
      name: 'Emoticon Pattern',
      sequence: ['52'], // VALID_EMOTICON final state
      description: 'Matches text-based emoticons',
      example: ':-))'
    },
    {
      name: 'Emoji Pattern',
      sequence: ['61'], // VALID_EMOJI final state
      description: 'Matches emoji unicode sequences',
      example: 'U+1F600'
    },
    {
      name: 'Email Pattern',
      sequence: ['75'], // VALID_EMAIL final state
      description: 'Matches email addresses',
      example: 'userName@example.com'
    }
  ];

  // Simplified findPatternMatches function
  const findPatternMatches = useMemo(() => {
    return (pattern) => {
      const matches = [];
      if (!tokens?.length) return matches;

      tokens.forEach((token, i) => {
        // Match token type with pattern type
        const tokenType = token.type;
        const patternType = pattern.name.replace(' Pattern', '').toUpperCase();
        const matchesType = tokenType === patternType;

        // Check if final state matches pattern's expected final state
        const matchesFinalState = pattern.sequence.includes(token.finalState);

        // Debug logging
        console.log('Processing token:', {
          value: token.value,
          type: tokenType,
          finalState: token.finalState,
          expectedState: pattern.sequence[0],
          matches: matchesType && matchesFinalState
        });

        if (matchesType && matchesFinalState) {
          matches.push({
            startIndex: i,
            tokens: [token],
            line: token.line || 1,
            position: token.position || 0,
            value: token.value
          });
        }
      });

      return matches;
    };
  }, [tokens]);

  // Update your debug effect
  useEffect(() => {
    if (tokens.length > 0 && stateMap) {
      console.log('Current Tokens:', tokens);
      tokens.forEach(token => {
        console.log('Token States:', {
          value: token.value,
          type: token.type,
          finalState: stateMap[token.finalState]?.name,
          transitions: token.transitions?.map(t => stateMap[t.to]?.name)
        });
      });
    }
  }, [tokens, stateMap]);

  // Debug effect
  useEffect(() => {
    if (tokens.length > 0) {
      console.log('Current Tokens:', tokens);
      patterns.forEach(pattern => {
        const matches = findPatternMatches(pattern);
        console.log(`${pattern.name} matches:`, matches);
      });
    }
  }, [tokens, findPatternMatches, patterns]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                 hover:border-[#EC4899]/30 transition-all duration-300 shadow-lg h-[400px] flex flex-col"
      style={glowStyles}
    >
      {/* Header with pattern count */}
      <div className="flex items-center justify-between mb-4">
        <motion.h3 
          className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                     from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
          style={gradientAnimation}
        >
          <div className="flex items-center gap-2">
            <FiSearch className="text-[#EC4899]" />
            Token Patterns
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#0D1117]/50 text-gray-400/80">
              {patterns.length}
            </span>
          </div>
        </motion.h3>
      </div>

      {/* Enhanced Patterns List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-grow space-y-2 overflow-y-auto custom-scrollbar pr-2"
      >
        {/* Changed AnimatePresence mode to "sync" */}
        <AnimatePresence mode="sync">
          {patterns.map((pattern, index) => {
            const matches = findPatternMatches(pattern);
            return (
              <motion.div
                key={`pattern-${index}`} // Added more specific key
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`group p-3 bg-[#0D1117]/80 rounded-lg border 
                          ${selectedPattern === index 
                            ? 'border-[#EC4899]/50' 
                            : 'border-transparent hover:border-[#EC4899]/20'} 
                          transition-all duration-300 backdrop-blur-sm cursor-pointer`}
                onClick={() => setSelectedPattern(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-medium">{pattern.name}</span>
                    <span className="text-xs text-gray-500">{pattern.description}</span>
                  </div>
                  <span className="text-xs text-gray-500/80 px-2 py-0.5 bg-[#1A1F2B]/50 rounded-md">
                    {matches.length} matches
                  </span>
                </div>

                {/* Pattern matches with context */}
                {selectedPattern === index && (
                  <motion.div
                    key={`matches-${index}`}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-3 pt-3 border-t border-gray-700/30 overflow-hidden"
                  >
                    {matches.length > 0 ? (
                      <motion.div 
                        className="space-y-2"
                        initial="hidden"
                        animate="visible"
                      >
                        {matches.map((match, idx) => (
                          <motion.div 
                            key={idx}
                            custom={idx}
                            variants={matchItemVariants}
                            className="text-sm text-gray-400 p-2 bg-[#0D1117]/50 rounded-lg
                                     transform-gpu hover:scale-[1.02] transition-transform duration-200"
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-gray-500">Line {match.line}</span>
                              <span className="text-xs text-gray-500">Match #{idx + 1}</span>
                            </div>
                            <div className="font-mono">
                              {match.tokens.map((token, i) => (
                                <motion.span 
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.1 + (i * 0.03) }}
                                  className="ml-2 inline-block"
                                >
                                  {token.value}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="text-sm text-gray-500 italic p-2"
                      >
                        Example: {pattern.example}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {tokens.length === 0 && (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-gray-500/60"
          >
            <span className="text-lg mb-2">No tokens to analyze</span>
            <span className="text-sm">Patterns will be detected from your tokens</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TokenPatterns;