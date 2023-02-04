import React, { useState, useRef, useContext } from 'react';
import { clearMockData } from '../../context/actions/mockDataActions';
import { toggleModal, setTestCase, updateFile } from '../../context/actions/globalActions';
import { GlobalContext } from '../../context/reducers/globalReducer';
import styles from './Modal.module.scss';

export function useNewTest(dispatchToMockData, dispatchTestCase, createTest, closeModal) {
  const [, dispatchToGlobal] = useContext(GlobalContext);
  const handleNewTest = (e) => {
    if (dispatchToMockData) dispatchToMockData(clearMockData());
    dispatchTestCase(createTest());
    closeModal();
    dispatchToGlobal(setTestCase(''));
    dispatchToGlobal(toggleModal());
    dispatchToGlobal(updateFile(''));
  };
  return { handleNewTest };
}
/**
 * This function will return an object with a cd and a install property that are based on which test argument it receives
 */
export function useGenerateScript(test) {

  const [{ projectFilePath }] = useContext(GlobalContext);
  //TODO: DRY this code

  switch (test) {
    case 'solid': 
      return {
        cd: `cd ${projectFilePath}`,
        install: 'npm i --save-dev jest solid-jest \nnpm i @babel/preset-env babel-preset-solid \nnpm i --save-dev test-data-bot \nnpm i --save-dev @testing-library/jest-dom \nnpm i --save-dev jest-environment-jsdom \nnpm i --save-dev solid-testing-library'
      }
    case 'acc':
      return {
        cd: `cd ${projectFilePath}`,
        install: `npm i -D jest`
      }
    case 'react':
      return {
        cd: `cd ${projectFilePath}`,
        install: `npm i -D @testing-library/jest-dom @testing-library/react test-data-bot jest`,
      };
    case 'redux':
      return {
        cd: `cd ${projectFilePath}`,
        install:
          'npm i -D @testing-library/jest-dom @testing-library/react test-data-bot redux-mock-store redux-thunk fetch-mock node-fetch jest',
      };
    case 'hooks':
      return {
        cd: `cd ${projectFilePath}`,
        install:
          'npm i -D @testing-library/jest-dom @testing-library/react test-data-bot @testing-library/react-hooks jest',
      };
    case 'endpoint':
      const endPointGuide = {
        1: `1. Please follow these steps to configure your files correctly. The tests will not run properly if you skip these steps.`,
        2: `2. Your server file MUST export your server object.`,
        3: `3. Comment out or remove the appropriate lines of code where the call to the server's listen method takes place.`,
        4: `4. If you are testing a route that involves querying a database, you must import the file where your database instance is created.`,
        5: `5. In that file, you must export your database instance object.`,
        '5a': `5a. PostgreSQL: Pool, Client, or pg object.`,
        '5b': `5b. MongoDB: MongoClient instance.`,
        '5c': `5c. Mongoose: mongoose instance.`,
      };
      return {
        endPointGuide: endPointGuide,
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D jest supertest regenerator-runtime core-js',
      };
    case 'graphQL':
      const graphQLGuide = {
        1: `1. Please follow these steps to configure your files correctly. The tests will not run properly if you skip these steps.`,
        2: `2. Your server file MUST export your server object.`,
        3: `3. Comment out or remove the appropriate lines of code where the call to the server's listen method takes place.`,
        4: `4. If you are testing a route that involves querying a database, you must import the file where your database instance is created.`,
        5: `5. In that file, you must export your database instance object.`,
        '5a': `5a. PostgreSQL: Pool, Client, or pg object.`,
        '5b': `5b. MongoDB: MongoClient instance.`,
        '5c': `5c. Mongoose: mongoose instance.`,
      };
      return {
        graphQLGuide: graphQLGuide,
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D jest supertest regenerator-runtime core-js',
      };    
    case 'puppeteer':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D puppeteer',
      };
    case 'vue':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'vue add unit-jest',
      };
    case 'svelte':
      return {
        cd: `cd ${projectFilePath}`,
        install: 'npm i -D @testing-library/svelte @testing-library/user-event @testing-library/jest-dom @babel/preset-env svelte-jester jest msw babel-jest'
      };
    case 'deno':
      return {
        cd: `cd ${projectFilePath}`,
        install: ``,
      };
    default:
      return {
        cd: ``,
        install: ``,
      };
    // code block
  }
}
