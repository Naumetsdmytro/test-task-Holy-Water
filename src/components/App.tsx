import React from 'react';
import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { SharedLayout } from './SharedLayout';

const Question = lazy(() => import('./pages/Question'));
const Email = lazy(() => import('./pages/Email'));
const Result = lazy(() => import('./pages/Result'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Navigate to="/quiz/1" replace />} />
        <Route path="quiz/:id" element={<Question />} />
        <Route path="/email" element={<Email />} />
        <Route path="/result" element={<Result />} />
      </Route>
    </Routes>
  );
};
