import React from 'react';
import { motion } from 'framer-motion';
import TokenInput from './TokenInput';
import TokenDisplay from './TokenDisplay';
import AutomataGraph from './AutomataGraph';
import TokenStatistics from './TokenStatistics';
import TokenHistory from './TokenHistory';
import TokenPatterns from './TokenPatterns';
import { useTokenizer } from '../context/TokenizerContext';
import TokenSelector from './TokenSelector';

const TokenizerSection = () => {
  const { 
    tokens, 
    tokenize,
    isProcessing,
    error,
    selectedToken,
    setSelectedToken 
  } = useTokenizer();

  // Add handler for tokenize
  const handleTokenize = async (input) => {
    try {
      await tokenize(input);
    } catch (err) {
      console.error('Tokenization error:', err);
    }
  };

  return (
    <section id="tokenizer" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-transparent to-[#0D1117]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-10" // Increased spacing between rows
        >
          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]">
              Finite Automata Tokenizer
            </span>
          </motion.h2>

          {/* First Row: Input and Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TokenInput 
                onTokenize={handleTokenize} 
                isProcessing={isProcessing}
                error={error}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TokenDisplay 
                tokens={tokens} 
                selectedToken={selectedToken}
                onTokenSelect={setSelectedToken}
              />
            </motion.div>
          </div>

          {/* Second Row: Full-width Automata Graph with Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-[600px] backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl 
                       border border-[#EC4899]/20 hover:border-[#EC4899]/30 
                       transition-all duration-300 shadow-lg"
          >
            {/* Title */}
            <motion.h3 
              className="text-lg font-semibold mb-4 text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
            >
              State Diagram
            </motion.h3>

            {/* Content Container */}
            <div className="flex h-[calc(100%-2rem)] gap-6">
              {/* Left: Token Selector */}
              <div className="w-64 h-full">
                <TokenSelector 
                  tokens={tokens}
                  selectedToken={selectedToken}
                  onTokenSelect={setSelectedToken}
                />
              </div>

              {/* Right: Graph Container */}
              <div className="flex-1 h-full">
                <AutomataGraph 
                  selectedToken={selectedToken}
                />
              </div>
            </div>
          </motion.div>

          {/* Third Row: Statistics, Patterns, and History */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TokenStatistics tokens={tokens} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TokenPatterns tokens={tokens} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TokenHistory />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Add error feedback */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/80 text-white px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </section>
  );
};

export default TokenizerSection;