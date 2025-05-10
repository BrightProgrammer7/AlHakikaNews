
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    let result;
    if (req.body.image) {
      // Process image analysis
      const base64Image = req.body.image.split(',')[1];
      const imagePart = {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      };
      
      result = await model.generateContent([
        "Analyze this image and detect any signs of manipulation, alteration, or fakery. Return a JSON response with the following structure: {analysis: string, reliability_score: number (0-100), confidence_level: number (0-100), flagged_keywords: string[], sentiment_score: number (-1 to 1)}",
        imagePart
      ]);
    } else if (req.body.name) {
      // Process text analysis
      result = await model.generateContent([
        "You are a news verification AI. Analyze this text for credibility and misinformation: " + req.body.name,
        "Return only a valid JSON object with this exact structure: {analysis: string, reliability_score: number (0-100), confidence_level: number (0-100), flagged_keywords: string[], sentiment_score: number (-1 to 1)}"
      ]);
    } else {
      throw new Error("No content provided for analysis");
    }
    
    const response = result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let structured_response = {
      analysis: "",
      reliability_score: 0,
      confidence_level: 0,
      flagged_keywords: [],
      sentiment_score: 0
    };

    if (jsonMatch) {
      try {
        structured_response = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error('JSON parsing error:', e);
      }
    }

    res.status(200).json(structured_response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      analysis: "",
      reliability_score: 0,
      confidence_level: 0,
      flagged_keywords: [],
      sentiment_score: 0
    });
  }
};
