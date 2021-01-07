import dragonJsonTypes from '../../fixture/dragonJsonTypes';

export function setJson(jsonData, type) {
  return {
    type: `setJson`,
    payload: jsonData,
  };
}

export function getJson() {
  return async (dispatch) => {
    const promises = [];
    dragonJsonTypes.forEach((val) => {
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

//TODO: 어떻게 Body.json()을 테스트 할 수 있는지 모르겠어서 test case를 만들지 못함
