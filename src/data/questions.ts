import { QuestionItem } from '../types/QuizTypes';
import wereWolf from '../images/werewolf.svg'
import action from '../images/action.svg'
import royalObession from '../images/royal-obession.svg'
import billionairs from '../images/billionairs.svg'
import youngAdult from '../images/young-adult.svg'
import badBoy from '../images/bad-boy.svg'
import romance from '../images/romance.svg'

export const questions: QuestionItem[] = [
    {
      id: 1,
      title: 'Which language do you prefer?',
      type: 'single-select',
      options: [
        { text: 'Italian' },
        { text: 'German' },
        { text: 'English' },
        { text: 'French' },
      ],
    },
    {
      id: 2,
      title: 'Select your favorite movie genre:',
      type: 'single-select',
      options: [
        { text: 'Drama', image: '/path/to/drama.jpg' },
        { text: 'Comedy', image: '/path/to/comedy.jpg' },
        { text: 'Horror', image: '/path/to/horror.jpg' },
        { text: 'Action', image: '/path/to/action.jpg' },
      ],
    },
    {
      id: 3,
      title: 'What is your age group?',
      type: 'single-select',
      options: [
        { text: 'Under 18' },
        { text: '18-24' },
        { text: '25-34' },
        { text: '35-44' },
        { text: '45 and above' },
      ],
    },
    {
      id: 4,
      title: 'What qualities do you value in a friend?',
      subTitle: "Highlight the traits that matter most to you in friendships",
      type: 'multiple-select',
      options: [
        { text: 'Honesty' },
        { text: 'Humor' },
        { text: 'Empathy' },
        { text: 'Reliability' },
        { text: 'Creativity' },
      ],
    },
    {
      id: 5,
      title: 'What are your favorite topics?',
      subTitle: "Choose up to three topics you like",
      type: 'bubble',
      options: [
        { text: 'Werewolf', image: wereWolf },
        { text: 'Action', image: action },
        { text: 'Royal Obession', image: royalObession },
        { text: 'Billionars', image: billionairs },
        { text: 'Young Adult', image: youngAdult },
        { text: 'Bad Boy', image: badBoy },
        { text: 'Romance', image: romance },
      ],
    },
  ];
  
