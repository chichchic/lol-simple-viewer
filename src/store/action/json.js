import jsonTypes from '../../fixture/jsonType';

export function setJson(jsonData, type) {
  return {
    type: `setJson`,
    payload: jsonData,
  };
}

export function getJson() {
  return async (dispatch) => {
    const promises = [];
    jsonTypes.forEach((val) => {
      promises.push(fetchJsonUrl(val));
    });
    const result = await Promise.all(promises);
    dispatch(setJson(result));
  };
}

function fetchJsonUrl(type) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/${type}.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}
