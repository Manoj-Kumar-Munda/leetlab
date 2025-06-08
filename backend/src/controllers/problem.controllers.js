import { db } from "../libs/db";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib";

const createProblem = async (req, res) => {
  // 1. get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // 2. check user role once again
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Admins only.",
    });
  }

  // 3.loop throgh each reference solution for different languages

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      //get the language id from the judge0.lib.js
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res.status(400).json({
          success: false,
          error: `Unsupported language: ${language}`,
        });
      }

      //submissions
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submitResults = await submitBatch(submissions);
      const tokens = submitResults.map((result) => result.token);

      const results = await pollBatchResults(tokens);

      //status - 3 -> accepted
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      // 4. create the problem in the database
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        data: newProblem,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getAllProblems = async (req, res) => {
  try {
  } catch (error) {}
};

const getProblemById = async (req, res) => {
  try {
  } catch (error) {}
};

const updateProblem = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteProblem = async (req, res) => {
  try {
  } catch (error) {}
};

const getSolvedProblems = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getSolvedProblems,
};
