import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi, TResponseGetMenu } from '@/lib/types';
import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function menu(
  req: NextApiRequest,
  res: NextApiResponse<TResponseGetMenu | IBaseResponseApi>,
) {
  if (req.method === 'POST') {
    try {
      const payload = req.body;

      const { data } = await axiosMcrExisting.post(`/MenuPage`, payload);

      if (data && data.isSuccess) {
        return res.status(200).json(data);
      }

      return res.status(400).json(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return res.status(400).json(error.response?.data);
      }
      return res.status(400);
    }
  } else {
    return res.status(403);
  }
}
