// const { OpenAIApi } = require("openai");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
  maxDuration: 200,
};

export default async function handler(req, res) {
  try {
    const body = req.body && JSON.parse(req.body);
    const { description } = body || {};

    const results = await openai.images.generate({
      // model: "dall-e-3",
      // prompt: "A cute baby sea otter",
      prompt: description,
    });

    await res.status(200).json({
      image: results.data[0],
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
