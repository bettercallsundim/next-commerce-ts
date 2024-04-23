/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";

type Props = {};
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

/* @ts-ignore */

export const useAxiosGet = (url: string, token?: string = "") => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);
  async function getAxios() {
    instance
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }
  React.useEffect(() => {
    getAxios();
  }, []);
  return { data, loading, error };
};
export const useAxiosPost = (url: string, token: string = "") => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);
  async function postAxios(datas: any) {
    instance
      .post(url, datas, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  return { data, loading, error, postAxios };
};
