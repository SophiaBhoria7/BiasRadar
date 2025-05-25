
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, BarChart3, FileText, Zap, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  tone: string;
  sentiment: string;
  bias_score: number;
  emotional_language: string[];
  framing_emphasis: string[];
  framing_omissions: string[];
  key_themes: string[];
  bias_explanation: string;
  summary: string;
}

const Index = () => {
  const [article1, setArticle1] = useState('');
  const [article2, setArticle2] = useState('');
  const [analysis1, setAnalysis1] = useState<AnalysisResult | null>(null);
  const [analysis2, setAnalysis2] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [neutralSummary, setNeutralSummary] = useState('');
  const [comparativeInsight, setComparativeInsight] = useState('');
  const { toast } = useToast();

  const analyzeText = async (text: string, articleNumber: number): Promise<AnalysisResult> => {
    // Simulate AI analysis with more sophisticated mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const words = text.toLowerCase().split(/\s+/);
    const emotionalWords = ['amazing', 'terrible', 'shocking', 'incredible', 'devastating', 'wonderful', 'awful', 'fantastic', 'horrible', 'brilliant', 'crisis', 'urgent', 'critical', 'alarming', 'breakthrough'];
    const biasWords = ['clearly', 'obviously', 'everyone knows', 'it\'s certain', 'without doubt', 'definitely', 'absolutely', 'undeniably', 'experts agree', 'studies show'];
    
    const emotionalCount = words.filter(word => emotionalWords.some(ew => word.includes(ew))).length;
    const biasCount = words.filter(word => biasWords.some(bw => word.includes(bw))).length;
    
    // More sophisticated bias scoring
    const bias_score = Math.min(10, Math.max(0, (biasCount * 2) + (emotionalCount * 1.5) + Math.random() * 2));
    
    const tones = ['Neutral and factual', 'Emotionally charged', 'Urgently persuasive', 'Analytically detached', 'Alarmist', 'Optimistic', 'Skeptical'];
    const sentiments = ['Positive', 'Negative', 'Neutral', 'Mixed'];
    
    const mockFramingEmphasis = [
      'Economic impact and statistics',
      'Personal stories and anecdotes', 
      'Expert opinions and research',
      'Government policy implications',
      'Long-term consequences'
    ];
    
    const mockFramingOmissions = [
      'Alternative viewpoints',
      'Potential counterarguments',
      'Historical context',
      'Economic costs of proposed solutions'
    ];
    
    const mockKeyThemes = [
      'Environmental concerns',
      'Economic implications', 
      'Public health considerations',
      'Policy recommendations',
      'Industry response'
    ];
    
    return {
      tone: tones[Math.floor(Math.random() * tones.length)],
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      bias_score: Math.round(bias_score * 10) / 10,
      emotional_language: emotionalWords.filter(word => text.toLowerCase().includes(word)).slice(0, 4),
      framing_emphasis: mockFramingEmphasis.slice(0, 3 + Math.floor(Math.random() * 2)),
      framing_omissions: mockFramingOmissions.slice(0, 2 + Math.floor(Math.random() * 2)),
      key_themes: mockKeyThemes.slice(0, 3 + Math.floor(Math.random() * 2)),
      bias_explanation: bias_score > 7 ? 'High use of emotional language and definitive statements without sufficient evidence or counterpoints.' :
                       bias_score > 4 ? 'Moderate bias through selective emphasis and some emotionally charged language.' :
                       'Relatively neutral presentation with balanced language and multiple perspectives.',
      summary: text.substring(0, 120) + '...'
    };
  };

  const handleAnalyze = async () => {
    if (!article1.trim() || !article2.trim()) {
      toast({
        title: "Missing Articles",
        description: "Please provide both articles to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const [result1, result2] = await Promise.all([
        analyzeText(article1, 1),
        analyzeText(article2, 2)
      ]);
      
      setAnalysis1(result1);
      setAnalysis2(result2);
      
      // Generate neutral summary and comparative insight
      setNeutralSummary("Based on analysis of both articles, this topic presents multiple perspectives with varying approaches to framing and emphasis. A comprehensive understanding requires considering the different methodologies, evidence types, and stakeholder viewpoints presented across both sources.");
      
      setComparativeInsight("The articles differ significantly in their approach and emphasis. While one focuses more on immediate concerns and emotional impact, the other takes a more analytical stance. Readers should consider both the quantitative data and qualitative experiences presented to form a balanced understanding of the issue.");
      
      toast({
        title: "Analysis Complete",
        description: "Both articles have been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the articles.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getBiasColor = (bias: number) => {
    if (bias < 3) return 'bg-green-500';
    if (bias < 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bias Radar
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze and compare articles for bias, tone, and framing. Get neutral summaries and insights.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <FileText className="h-5 w-5 mr-2" />
                Article 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the first article here..."
                value={article1}
                onChange={(e) => setArticle1(e.target.value)}
                className="min-h-[200px] resize-none border-gray-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <FileText className="h-5 w-5 mr-2" />
                Article 2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the second article here..."
                value={article2}
                onChange={(e) => setArticle2(e.target.value)}
                className="min-h-[200px] resize-none border-gray-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="h-5 w-5 mr-2" />
                Analyze Bias
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {(analysis1 && analysis2) && (
          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="summary">Neutral Summary</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Article 1 Analysis */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Article 1 Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Bias Score</span>
                        <Badge className={`${getBiasColor(analysis1.bias_score)} text-white`}>
                          {analysis1.bias_score}/10
                        </Badge>
                      </div>
                      <Progress value={analysis1.bias_score * 10} className="h-3" />
                      <p className="text-sm text-gray-600 mt-2">{analysis1.bias_explanation}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tone</span>
                      <Badge variant="outline">{analysis1.tone}</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sentiment</span>
                      <Badge variant="secondary">{analysis1.sentiment}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Article 2 Analysis */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Article 2 Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Bias Score</span>
                        <Badge className={`${getBiasColor(analysis2.bias_score)} text-white`}>
                          {analysis2.bias_score}/10
                        </Badge>
                      </div>
                      <Progress value={analysis2.bias_score * 10} className="h-3" />
                      <p className="text-sm text-gray-600 mt-2">{analysis2.bias_explanation}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tone</span>
                      <Badge variant="outline">{analysis2.tone}</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sentiment</span>
                      <Badge variant="secondary">{analysis2.sentiment}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Article 1 Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                        Emotional Language
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis1.emotional_language.map((word, idx) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                        Key Themes
                      </h4>
                      <ul className="space-y-1">
                        {analysis1.key_themes.map((theme, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {theme}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Framing Emphasis</h4>
                      <ul className="space-y-1">
                        {analysis1.framing_emphasis.map((emphasis, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {emphasis}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Article 2 Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                        Emotional Language
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis2.emotional_language.map((word, idx) => (
                          <Badge key={idx} variant="destructive" className="text-xs">
                            {word}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                        Key Themes
                      </h4>
                      <ul className="space-y-1">
                        {analysis2.key_themes.map((theme, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {theme}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Framing Emphasis</h4>
                      <ul className="space-y-1">
                        {analysis2.framing_emphasis.map((emphasis, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {emphasis}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="summary">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Neutral Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{neutralSummary}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Comparative Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">{comparativeInsight}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">How Articles Complement Each Other:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Different evidence types provide fuller picture</li>
                        <li>• Various stakeholder perspectives represented</li>
                        <li>• Complementary analytical approaches</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Contradictions:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Different urgency levels emphasized</li>
                        <li>• Conflicting priority assessments</li>
                        <li>• Varying solution effectiveness claims</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
