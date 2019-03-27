import fetch from 'isomorphic-fetch';

const FEATURES = {
  features: {
    relations:{
      "model": "bdc3c259-28f7-46ef-b994-46db11af8014"
    },
    concepts: {},
    entities: {
      "model": "bdc3c259-28f7-46ef-b994-46db11af8014"
    },
    keywords: {},
    categories: {},
    emotion: {},
    sentiment: {},
    semantic_roles: {},

    syntax: {
      tokens: {
        lemma: true,
        part_of_speech: true,
      },
      sentences: true,
    },
  },
};


const parseJSON = (response) => { // eslint-disable-line
  return response.json();
};

const handleErrors = (response) => {
  if (response.error) {
    throw response;
  }
  return response;
};

/**
 * Calls the NLU /analyze endpoint
 *
 * @param  {Object} params The parameters
 * @return {Promise}       The request promise
 */
export const analyze = params => fetch('/api/analyze', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(params),
})
  .then(parseJSON)
  .then(handleErrors);


/**
 * Extend the `params` parameters with all the text
 * features before calling `analyze`.
 *
 * @param  {Object} params The parameters
 * @return {Promise}        The request promise
 */
export const analyzeWithAllFeatures = (params) => {
  const query = Object.assign({}, FEATURES, params);
  return analyze(query);
};
