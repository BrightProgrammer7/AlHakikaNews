# 📰 AlHakikaNews – AI-Powered Fake News Detection

AlHakikaNews is an AI-powered platform designed to combat misinformation and disinformation in textual and visual content. By combining Generative AI with classical machine learning techniques, AlHakikaNews enables real-time verification and credibility scoring of news articles.

---

## 🚀 Project Highlights

- ✅ Detects and classifies fake news in real-time.
- 🧠 Uses GPT-4 and Gemini for semantic analysis of text.
- 🛠️ Ensemble of ML models (Logistic Regression, Decision Tree, Gradient Boosting).
- 🌐 Web interface built with Node.js for public access and transparency.
- 📊 Returns visual reliability scores, confidence levels, and flagged keywords.

---

## 🧩 Problem Tackled

Fake news is increasingly propagated via social media and clickbait headlines. AlHakikaNews targets:

- Semantic inconsistencies  
- Low-context headlines  
- Cross-source narrative conflicts  
- Multilingual misinformation (Arabic, French, English)

---

## ⚙️ Architecture

User Input ➝ Node.js Web Interface ➝ GPT-4 & Gemini ➝ Preprocessed via NLP Pipeline ➝
Classical ML Models ➝ Ensemble Logic ➝ Results Displayed with Confidence Scores



---

## 🧪 Technologies Used

- 🔤 **NLP**: Text preprocessing, TF-IDF, tokenization, stopword removal
- 🤖 **Transformers**: GPT-4, Gemini
- 🧮 **Classical ML**: Logistic Regression, Decision Tree, Gradient Boosting
- 💻 **Frontend/Backend**: Node.js, HTML/CSS, Replit Cloud
- ☁️ **Deployment**: Cloud-based prototype (Replit), targeting Moroccan hosting for production

---

## 📚 Datasets

- **Fake and Real News Dataset** from Kaggle
- **Custom-curated** multilingual dataset from Moroccan, French, and Arabic sources  
**Total Size**: ~44,000 articles (23k real / 21k fake)

---

## 🧹 Preprocessing

- Lowercasing, punctuation removal
- Tokenization and stemming
- Stopwords filtering
- TF-IDF vectorization
- GPT embeddings for semantic evaluation

---

## 📈 Performance

| Metric       | Score     |
|--------------|-----------|
| Accuracy     | 95.3%     |
| Precision    | 94.8%     |
| Recall       | 95.9%     |
| F1 Score     | 95.3%     |
| AUC-ROC      | High      |

- GPT API latency: ~500ms  
- Full web round-trip: ~1.2s  
- Ensemble model latency: ~1s average

---

## ⚖️ Fairness & Bias Mitigation

- Ensured topic and regional diversity
- Evaluated false positives across regions
- Included MENA news for cultural fairness

---

## 🌍 Real-World Application

Currently deployed on Replit Cloud with a public web interface for:

- Journalists
- Educators
- General public

Supports input via text or URLs. Future deployment planned on Moroccan national cloud infrastructure.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, suggest improvements, or help enhance the models.

---

## 📄 License

MIT License – See [`LICENSE`](LICENSE) for details.

---

## 👥 Team

Built with ❤️ by the AlHakikaNews team for the DeepFake Hackathon at UM6P.

