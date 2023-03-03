import { AdaptorDeets } from '../types';
import fetch from 'cross-fetch';

export default async function getSpectralData(
  address: string
) {

  try {
      const resp = await fetch(
        `https://api.spectral.finance/api/v1/addresses/${address}`,
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer SFMyNTY.g2gDbQAAACQyNzUwNmFiYS0xMDk3LTRiMmItYjQ3Yi0zMmUwN2YzODFmNGZuBgAaiHemhgFiAAFRgA.xsjeWeb83jGD9aNpDa5HWdjtBglgqOgyrI6F1bCJLjA"
            }
        }
      );
    
      if (resp.status === 404) return false;
      else {
        let json = await resp.json()
        if (json['status'] === 'done') return json;
        else return false;
      }
    
  } catch (error) {
    return false;
  }

}

export const SpectralAdaptorDeets: AdaptorDeets = {
  id: 'spectral',
  name: 'Spectral',
  projectThumbnail:
    'ipfs://bafybeibdh4goqlra7egsjekq67vmpmukrxgobbm6dix564zqdp23vpfkyu/spectral.webp',
  projectUrl: 'https://spectral.finance',
  requiredConfigKeys: [],
};
