import React, {useState} from "react";
import {getDataForShortUrl, updateUrls} from "../utils/ClientUtils";
import {ErrorMessage, Field, Form, Formik} from "formik";

const formsValidation = (values) =>{
  const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

  const errors = {};
  if (!values.longUrl) {
    errors.longUrl = 'Required';
  } else if (!urlRegex.test(values.longUrl)) {
    errors.longUrl = 'Invalid url';
  }
  return errors;
};

const shortUrlFormValidation = (values) =>{
  const errors = {};
  if (!values.shortUrl) {
    errors.shortUrl = 'Required';
  }
  return errors;
};

export const Setup= () => {
  const [isLongUrlSubmitting, setLongUrlSubmitting] = useState(false);
  const [isVisiting, setVisiting] = useState(false);
  const [shortUrl, setShortUrl] = useState('');

  const onLongUrlSubmit = async (values, {setLongUrlSubmitting}) => {
    try {
      let urlObj = new URL(`${window.location.origin}/api/url/generate`);
      const response = await fetch(urlObj, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({longUrl: values.longUrl}),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      alert('An error occurred');
    }
  }

  const onShortUrlSubmit = async (values) => {
    try {
       await getDataForShortUrl(values.shortUrl);
      const updateData = await updateUrls(values.shortUrl);
      window.location.replace(updateData.longUrl);
    } catch (error) {
      alert('An error occurred')
    }
  };

  return (
      <>
        <h1 className="App-header-short">Shortify: Get your user friendly
          url</h1>
        <Formik initialValues={{longUrl: 'https://google.com'}}
                validate={formsValidation} onSubmit={onLongUrlSubmit}>
          <Form>
            <Field className="Field" type="url" name="longUrl"/>
            <ErrorMessage className="Error" name="longUrl" component="div"/>
            <button className="Button" type="submit"
                    disabled={isLongUrlSubmitting}>Submit
            </button>
            <h3>Shortened url is {shortUrl}</h3>
          </Form>
        </Formik>
        <h1 className="App-header-visit">Shortify: Visit short url</h1>
        <Formik initialValues={{visit: ''}} validate={shortUrlFormValidation}
                onSubmit={onShortUrlSubmit}>
          <Form>
            <Field className="Field" type="text" name="shortUrl"/>
            <ErrorMessage className="Error" name="shortUrl" component="div"/>
            <button className="Button" type="submit" disabled={isVisiting}>Click
              to Visit short url
            </button>
          </Form>
        </Formik>
      </>)
}

export default Setup;