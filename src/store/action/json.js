import dragonJsonTypes from '../../fixture/dragonJsonTypes';

export function setJson(jsonData, type) {
  return {
    type: `setJson`,
    payload: jsonData,
  };
}

export function getJson() {
  return async (dispatch) => {
    try {
      const promises = [];
      dragonJsonTypes.forEach((val) => {
        promises.push(fetchJsonUrl(val));
      });
      const result = await Promise.all(promises);
      dispatch(setJson(result));
    } catch (err) {
      throw new Error(err);
    }
  };
}

function fetchJsonUrl(type) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/${type}.json`,
    );
    if (!res.ok) {
      reject(res.status);
    } else {
      resolve(res.json());
    }
  });
}

//TODO: 어떻게 Body.json()을 테스트 할 수 있는지 모르겠어서 test case를 만들지 못함
