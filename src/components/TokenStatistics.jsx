import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPieChart, FiBarChart2, FiList, FiActivity, FiHash, FiTag, FiAlignLeft, FiAlignJustify, FiMaximize2, FiMinimize2, FiGrid, FiAlertCircle } from 'react-icons/fi';
import { glowStyles, containerVariants, itemVariants, gradientAnimation } from '../utils/styles';
import { useTokenizer } from '../context/TokenizerContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// First, update the token colors mapping
const tokenColors = {
  WORD: '#9333EA',      // Purple 600
  PHRASE: '#3B82F6',    // Blue 500
  SENTENCE: '#10B981',  // Green 500
  NUMBER: '#F59E0B',    // Yellow 500
  URL: '#EF4444',       // Red 500
  HASHTAG: '#EC4899',   // Pink 500
  MENTION: '#6366F1',   // Indigo 500
  EMOTICON: '#F97316',  // Orange 500
  EMAIL: '#06B6D4',     // Cyan 500
  PUNCTUATION: '#6B7280', // Gray 500
  ERROR: '#B91C1C',     // Red 700
  unknown: '#374151'    // Gray 700
};

// Add getErrorRate calculation in the component
const TokenStatistics = () => {
  const { tokens } = useTokenizer();
  const [viewMode, setViewMode] = useState('stats');

  // Fix getErrorRate calculation
  const errorRate = useMemo(() => {
    if (!tokens.length) return 0;
    const errorCount = tokens.filter(token => token.type === 'ERROR').length;
    return ((errorCount / tokens.length) * 100).toFixed(1);
  }, [tokens]);

  // Enhanced statistics calculations
  const stats = useMemo(() => ({
    total: tokens.length,
    types: new Set(tokens.map(t => t.type)).size,
    distribution: tokens.reduce((acc, token) => {
      acc[token.type] = (acc[token.type] || 0) + 1;
      return acc;
    }, {}),
    averageLength: tokens.length ? 
      (tokens.reduce((sum, t) => sum + t.value.length, 0) / tokens.length).toFixed(1) : 0,
    maxLength: tokens.length ?
      Math.max(...tokens.map(t => t.value.length)) : 0,
    minLength: tokens.length ?
      Math.min(...tokens.map(t => t.value.length)) : 0,
    lineDistribution: tokens.reduce((acc, token) => {
      acc[token.line] = (acc[token.line] || 0) + 1;
      return acc;
    }, {})
  }), [tokens]);

  const getPercentage = (count) => ((count / stats.total) * 100).toFixed(1);

  // View mode options with icons
  const viewModes = [
    { id: 'stats', label: 'Overview', icon: FiBarChart2 },
    { id: 'charts', label: 'Analysis', icon: FiPieChart },
    { id: 'timeline', label: 'Timeline', icon: FiActivity }
  ];

  // Add gradient colors for different states
  const stateColors = {
    'WORD': '#FF69B4',      // Pink
    'PHRASE': '#DA70D6',    // Orchid
    'SENTENCE': '#9370DB',  // Medium Purple
    'NUMBER': '#8A2BE2',    // Blue Violet
    'URL': '#4B0082',       // Indigo
    'HASHTAG': '#483D8B',   // Dark Slate Blue
    'MENTION': '#000080',   // Navy
    'EMOTICON': '#6A5ACD',  // Slate Blue
    'EMAIL': '#7B68EE',     // Medium Slate Blue
    'ERROR': '#FF1493'      // Deep Pink
  };

  // Add chart options and configs
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    }
  };

  // Update the content section to handle empty state
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                 hover:border-[#EC4899]/30 transition-all duration-300 shadow-lg h-[400px] flex flex-col"
      style={glowStyles}
    >
      {/* Header with compact view controls */}
      <div className="flex flex-col gap-4 mb-4">
        {/* Header */}
        <motion.h3 
          className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                     from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
          style={gradientAnimation}
        >
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-[#EC4899]" />
            Token Analysis
          </div>
        </motion.h3>
        
        {/* View mode buttons - Updated styling */}
        <div className="flex w-full gap-1.5 bg-[#0D1117]/30 p-1 rounded-lg">
          {viewModes.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 8px rgba(236, 72, 153, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode(id)}
              className={`flex-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200
                         flex items-center justify-center gap-1.5 ${viewMode === id 
                           ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white' 
                           : 'text-gray-400 hover:text-[#EC4899] hover:bg-[#0D1117]/50'}`}
              style={{
                boxShadow: viewMode === id ? '0 0 12px rgba(236, 72, 153, 0.2)' : 'none'
              }}
            >
              <Icon size={12} />
              <span className="whitespace-nowrap">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {tokens.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-grow overflow-hidden"
          >
            {viewMode === 'stats' && (
              <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                <div className="grid grid-cols-2 gap-4 p-2">
                  {[
                    { label: 'Total Tokens', value: stats.total, icon: FiHash },
                    { label: 'Token Types', value: stats.types, icon: FiTag },
                    { label: 'Avg. Length', value: stats.averageLength, icon: FiAlignLeft },
                    { label: 'Lines', value: Object.keys(stats.lineDistribution).length, icon: FiAlignJustify },
                    { label: 'Max Length', value: stats.maxLength, icon: FiMaximize2 },
                    { label: 'Min Length', value: stats.minLength, icon: FiMinimize2 },
                    { label: 'Categories', value: Object.keys(stats.distribution).length, icon: FiGrid },
                    { label: 'Error Rate', value: `${errorRate}%`, icon: FiAlertCircle }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="p-4 bg-[#0D1117]/40 rounded-xl hover:bg-[#0D1117]/50 
                               transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className="text-[#EC4899]" size={16} />
                        <div className="text-sm text-gray-400">{item.label}</div>
                      </div>
                      <div className="text-xl font-semibold text-gray-200">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'charts' && (
              <div className="h-full space-y-6 overflow-y-auto custom-scrollbar pr-2">
                {/* Type Composition Chart */}
                <motion.div 
                  className="p-6 bg-[#0D1117]/40 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-sm font-medium text-gray-400 mb-6">Token Type Distribution</h4>
                  <div className="h-80">
                    <Pie 
                      data={{
                        labels: Object.keys(stats.distribution),
                        datasets: [{
                          data: Object.values(stats.distribution),
                          backgroundColor: Object.keys(stats.distribution).map(type => tokenColors[type] || tokenColors.unknown)
                        }]
                      }} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: 'rgba(255, 255, 255, 0.7)',
                              padding: 20,
                              usePointStyle: true,
                              font: { size: 11 }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </motion.div>

                {/* Token Length Distribution */}
                <motion.div 
                  className="p-6 bg-[#0D1117]/40 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-sm font-medium text-gray-400 mb-6">Token Length Distribution</h4>
                  <div className="h-64">
                    <Bar
                      data={{
                        labels: ['Min', 'Average', 'Max'],
                        datasets: [{
                          data: [stats.minLength, stats.averageLength, stats.maxLength],
                          backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6']
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        plugins: {
                          legend: { display: false }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                              color: 'rgba(255, 255, 255, 0.5)'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>

                {/* Line Analysis Progress */}
                <motion.div 
                  className="p-6 bg-[#0D1117]/40 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-sm font-medium text-gray-400 mb-6">Token Line Distribution</h4>
                  <div className="space-y-4">
                    {Object.entries(stats.lineDistribution)
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([line, count], index) => (
                      <div key={line} className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Line {line}</span>
                          <span>{count} token/s</span>
                        </div>
                        <motion.div 
                          className="h-2 rounded-full bg-[#1A1F2B]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]"
                            style={{ 
                              width: `${(count / Math.max(...Object.values(stats.lineDistribution))) * 100}%` 
                            }}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {viewMode === 'timeline' && (
              <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                <div className="space-y-1.5">
                  {tokens.map((token, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 bg-[#0D1117]/40 rounded-lg
                               hover:bg-[#0D1117]/60 transition-all duration-300"
                    >
                      <div className={`w-1 h-6 rounded-full bg-gradient-to-b from-[${stateColors[token.type]}] 
                                    to-[${stateColors[token.type]}]/70`} />
                      <span className="font-mono text-sm text-gray-200">{token.value}</span>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#0D1117]/50 text-gray-400">
                          Line {token.line}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#0D1117]/50 text-gray-400">
                          Pos {token.position}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center flex-grow text-gray-500/60"
          >
            <span className="text-lg mb-2">No statistics yet</span>
            <span className="text-sm">Token statistics will appear here</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TokenStatistics;