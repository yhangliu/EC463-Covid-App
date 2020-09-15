import axios from 'axios';

const url = 'https://api.covidtracking.com/v1/states/MA/current.json?state=MA';

export const getData = async () => {
    try {
        const { data: { recovered, lastUpdateEt, death, deathIncrease, hospitalized, hospitalizedCurrently, hospitalizedIncrease, positive, positiveIncrease, negative, negativeIncrease } } = await axios.get(url);

        
        return { recovered, lastUpdateEt, death, deathIncrease, hospitalized, hospitalizedCurrently, hospitalizedIncrease, positive, positiveIncrease, negative, negativeIncrease };
    } catch (error) {
      return error;
    }
}