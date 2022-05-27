import axios from 'axios';
import { startLoading, getRecordsSuccess, hasError } from './slice';

const baseUrl=`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ID}/`

const headers = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  }

export const fetchRecords = (name: string) => 
  async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const url = `${baseUrl}Students?filterByFormula=Name="${name}"`;
      const { data } = await axios.get(url, headers);

      const studentIds: string[] = [];
      data.records.map((record: any) => {
        return record.fields.Classes.map((studentId: string ) => {
          return studentIds.push(studentId);
       });
      })

      const searchResult = await Promise.all(
        studentIds.map(async(studentId: any) => {
          const { data } = await axios.get(`${baseUrl}Classes/${studentId}`, headers)
          const details = {
            className: data.fields.Name,
            classMates:  await Promise.all( data.fields.Students.map(async(iD: string ) => {
              const { data } = await axios.get(`${baseUrl}Students/${iD}`, headers)
              return data.fields.Name;
            })) 
          }
          return details;
        })
      )

      dispatch(getRecordsSuccess(searchResult));

    } catch (e: any) {
      dispatch(hasError(e.message));
    }
  }

