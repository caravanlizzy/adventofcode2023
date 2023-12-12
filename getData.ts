import axios from 'axios';

require('dotenv').config()

export async function getData(day: number): Promise<any> {
  const url = `https://adventofcode.com/2023/day/${day}/input`;
  const token = process.env.TOKEN;
  const data = await axios.get(url, {withCredentials: true, headers: {Cookie: token}});
  return data.data;
}
