import React from 'react';
import { motion } from 'framer-motion';
import { useTokenizer } from '../context/TokenizerContext';

const TokenSelector = () => {
  const { 
    tokens, 
    selectedToken, 
    setSelectedToken, 
    getStateName,
    INITIAL_STATES,
    ACCEPTING_STATES 
  } = useTokenizer();

  const getTransitionsForType = (type, value) => {
    switch (type) {
      case 'WORD':
        return [
          { from: '0', to: '1', read: '[a-z]' },
          { from: '1', to: '2', read: '[a-z]' }
        ];
      case 'PHRASE':
        return [
          { from: '0', to: '3', read: '[a-zA-Z]' },
          { from: '3', to: '4', read: '[a-zA-Z]' }
        ];
      case 'SENTENCE':
        return [
          { from: '0', to: '5', read: '[A-Z]' },
          { from: '5', to: '6', read: '[a-zA-Z]' },
          { from: '6', to: '6', read: '[a-zA-Z0-9 ]' },
          { from: '6', to: '7', read: '[.!?]' }
        ];
      case 'NUMBER':
        return [
          { from: '0', to: '9', read: '[0-9]' },
          { from: '9', to: '10', read: '[0-9]' }
        ];
      case 'URL':
        return [
          { from: '0', to: '20', read: 'h' },
          { from: '20', to: '21', read: 'ttp://' },
          { from: '21', to: '22', read: '[a-zA-Z]' }
        ];
      case 'HASHTAG':
        return [
          { from: '0', to: '30', read: '#' },
          { from: '30', to: '31', read: '[a-zA-Z0-9]' }
        ];
      case 'MENTION':
        return [
          { from: '0', to: '40', read: '@' },
          { from: '40', to: '41', read: '[a-zA-Z0-9]' }
        ];
      case 'EMOTICON':
        return [
          { from: '0', to: '50', read: '[:;]' },
          { from: '50', to: '51', read: '[-=+.*"~^o3]' },
          { from: '51', to: '52', read: '[)(3089<>=$\\/\\VXSPDJOCB]' }
        ];
      case 'EMOJI':
        return [
          { from: '0', to: '60', read: 'U' },
          { from: '60', to: '61', read: '+' }
        ];
      case 'EMAIL':
        return [
          { from: '0', to: '70', read: '[a-zA-Z]' },
          { from: '70', to: '71', read: '[a-zA-Z0-9._-]' },
          { from: '71', to: '72', read: '@' },
          { from: '72', to: '73', read: '[a-zA-Z0-9]' },
          { from: '73', to: '74', read: '.' },
          { from: '74', to: '75', read: '[a-zA-Z]' }
        ];
      default:
        return [];
    }
  };

  const handleTokenSelect = (token) => {
    if (!token) return;

    const transitions = getTransitionsForType(token.type, token.value);
    
    // Create enriched token with state information
    const enrichedToken = {
      ...token,
      transitions,
      states: {
        initial: '0',
        current: token.finalState,
        accepting: ACCEPTING_STATES[token.type] || [],
        sequence: transitions.map(t => ({
          from: INITIAL_STATES[t.from]?.name || t.from,
          to: INITIAL_STATES[t.to]?.name || t.to,
          read: t.read,
          fromId: t.from,
          toId: t.to
        }))
      }
    };

    console.log('Selected Token with States:', {
      type: token.type,
      finalState: token.finalState,
      acceptingStates: ACCEPTING_STATES[token.type],
      transitions: transitions,
      isAccepting: ACCEPTING_STATES[token.type]?.includes(token.finalState)
    });

    setSelectedToken(enrichedToken);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Tokenized Input</h3>
      <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 p-2">
        {tokens.map((token, index) => (
          <div key={`${token.type}-${index}`} className="transform-gpu">
            <motion.button
              onClick={() => handleTokenSelect(token)}
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1, ease: 'easeIn' }
              }}
              className={`w-full p-3 rounded-lg text-left transition-colors duration-200
                         ${selectedToken?.value === token.value && selectedToken?.type === token.type
                           ? 'bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/50 shadow-lg shadow-[#EC4899]/10'
                           : 'bg-[#1A1F2B]/70 text-gray-400 hover:bg-[#1A1F2B] border border-transparent'
                         }`}
            >
              <motion.div
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-mono text-sm font-medium">{token.value}</div>
                <div className="text-xs opacity-60 mt-1">Type: {token.type}</div>
                <div className="text-xs mt-1 text-gray-500">
                  Line: {token.line}, Position: {token.position}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  Final State: {getStateName(token.finalState)}
                </div>
              </motion.div>
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenSelector;