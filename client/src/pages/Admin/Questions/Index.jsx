import React from 'react'
import './Index.scss'
import { Helmet } from 'react-helmet'
import QuestionTableTop from '../../../components/Admin/QuestionTableTop/Index'
import QuestionsTable from '../../../components/Admin/QuestionsTable/Index'
const Questions = () => {
  return (
    <main className='questionsAdmin'>
      <Helmet>
        <title>Questions</title>
      </Helmet>
      <div className="questionsAdminInside">
        <QuestionTableTop />
        <QuestionsTable />
      </div>
    </main>
  )
}

export default Questions
