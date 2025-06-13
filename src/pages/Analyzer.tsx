import React, { useState, useRef } from 'react';
import { Upload, FileText, BarChart3, Target, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  sections: {
    structure: { score: number; feedback: string[] };
    content: { score: number; feedback: string[] };
    keywords: { score: number; feedback: string[]; missing: string[] };
    formatting: { score: number; feedback: string[] };
  };
  recommendations: string[];
  strengths: string[];
  jobAlignment?: {
    score: number;
    matchingKeywords: string[];
    missingKeywords: string[];
  };
}

const Analyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        toast.success('File uploaded successfully!');
      } else {
        toast.error('Please upload a PDF or DOCX file.');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type === 'application/pdf' || 
          droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(droppedFile);
        toast.success('File uploaded successfully!');
      } else {
        toast.error('Please upload a PDF or DOCX file.');
      }
    }
  };

  const simulateAnalysis = async (): Promise<AnalysisResult> => {
    // Simulate AI analysis - In production, this would call your AI API
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      overallScore: 78,
      atsScore: 85,
      sections: {
        structure: {
          score: 80,
          feedback: [
            'Good section organization with clear headings',
            'Consider adding a professional summary section',
            'Work experience section is well-structured'
          ]
        },
        content: {
          score: 75,
          feedback: [
            'Strong action verbs used throughout',
            'Quantify achievements with specific numbers',
            'Expand on key accomplishments in recent roles'
          ]
        },
        keywords: {
          score: 70,
          feedback: [
            'Good use of industry-relevant keywords',
            'Missing some key technical terms',
            'Consider adding more soft skills keywords'
          ],
          missing: ['project management', 'agile methodology', 'cross-functional collaboration']
        },
        formatting: {
          score: 90,
          feedback: [
            'Clean, professional formatting',
            'Consistent font usage throughout',
            'Good use of white space'
          ]
        }
      },
      recommendations: [
        'Add quantifiable achievements (e.g., "Increased sales by 25%")',
        'Include more industry-specific keywords',
        'Consider adding a skills section if missing',
        'Optimize for ATS by using standard section headings',
        'Include relevant certifications or training'
      ],
      strengths: [
        'Professional formatting and layout',
        'Clear career progression shown',
        'Strong action verbs used effectively',
        'Relevant work experience highlighted',
        'Good length (1-2 pages)'
      ],
      jobAlignment: jobDescription ? {
        score: 72,
        matchingKeywords: ['JavaScript', 'React', 'Node.js', 'API development'],
        missingKeywords: ['TypeScript', 'AWS', 'Docker', 'CI/CD']
      } : undefined
    };
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a resume file first.');
      return;
    }

    setAnalyzing(true);
    try {
      const result = await simulateAnalysis();
      setAnalysisResult(result);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const ScoreCircle: React.FC<{ score: number; label: string; color: string }> = ({ score, label, color }) => (
    <div className="text-center">
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center border-4 ${color}`}>
        <span className="text-2xl font-bold">{score}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upload your resume to get AI-powered feedback on structure, content, ATS compatibility, and job alignment.
          </p>
        </div>

        {!analysisResult ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* File Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Your Resume
              </h2>
              
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {file ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      Drag and drop your resume here, or click to select
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supports PDF and DOCX files up to 10MB
                    </p>
                  </>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Job Description (Optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Job Description (Optional)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Paste the job description to get targeted feedback on how well your resume aligns with the role.
              </p>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />
            </div>
          </div>
        ) : null}

        {/* Analyze Button */}
        {!analysisResult && (
          <div className="text-center mt-8">
            <button
              onClick={handleAnalyze}
              disabled={!file || analyzing}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {analyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing Resume...</span>
                </div>
              ) : (
                <>
                  <BarChart3 className="h-5 w-5 inline mr-2" />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-8">
            {/* Overall Scores */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Analysis Results
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <ScoreCircle 
                  score={analysisResult.overallScore} 
                  label="Overall Score" 
                  color="border-blue-500 text-blue-600 dark:text-blue-400"
                />
                <ScoreCircle 
                  score={analysisResult.atsScore} 
                  label="ATS Score" 
                  color="border-green-500 text-green-600 dark:text-green-400"
                />
                <ScoreCircle 
                  score={analysisResult.sections.content.score} 
                  label="Content Quality" 
                  color="border-purple-500 text-purple-600 dark:text-purple-400"
                />
                <ScoreCircle 
                  score={analysisResult.sections.keywords.score} 
                  label="Keywords" 
                  color="border-orange-500 text-orange-600 dark:text-orange-400"
                />
              </div>

              {analysisResult.jobAlignment && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Job Alignment Score: {analysisResult.jobAlignment.score}%
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Matching Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.jobAlignment.matchingKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Missing Keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.jobAlignment.missingKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Section Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(analysisResult.sections).map(([section, data]) => (
                <div key={section} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                    {section} Analysis
                  </h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Score</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{data.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {data.feedback.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        {data.score >= 80 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Recommendations and Strengths */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* New Analysis Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setFile(null);
                  setJobDescription('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;