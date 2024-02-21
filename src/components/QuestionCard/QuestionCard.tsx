// import { NavLink, Link, useLocation, Outlet } from 'react-router-dom';
// import { Suspense } from 'react';

// import plug from '../../images/plug.jpg';
// import styles from './MovieCard.module.css';

// export const QuestionCard = ({ movie }) => {
//   const location = useLocation();
//   const backLinkHref = location.state?.from ?? '/';

//   const date = new Date(movie.release_date);

//   const { img, genres, release, voteAverage } = {
//     img: movie.poster_path,
//     genres: movie.genres.map(({ name }) => name).join(', '),
//     release: date.getUTCFullYear(movie.release_date),
//     voteAverage: movie.vote_average.toFixed(1) * 10,
//   };

//   return (
//     <>
//       <Link to={backLinkHref}>
//         <button type="button" className={styles.cardButton}>
//           Go back
//         </button>
//       </Link>
//       <div className={styles.container}>
//         {img ? (
//           <img
//             src={`https://image.tmdb.org/t/p/w500` + img}
//             alt={movie.title}
//             width={270}
//             height={350}
//             className={styles.movieImg}
//           />
//         ) : (
//           <img
//             src={plug}
//             width={280}
//             height={360}
//             alt="plug"
//             className={styles.movieImg}
//           />
//         )}
//         <div className={styles.informationContainer}>
//           <h2 className={styles.movieTitle}>
//             {movie.title} ({release})
//           </h2>
//           <p className={styles.movieText}>User Score: {voteAverage}%</p>
//           <h3 className={styles.movieTitle}>Overview</h3>
//           <p className={styles.movieText}>{movie.overview}</p>
//           <h3 className={styles.movieTitle}>Genres</h3>
//           <p className={styles.movieText}>{genres}</p>
//         </div>
//       </div>
//       <div className={styles.aditionInformContainer}>
//         <h3 className={styles.movieTitle}>Aditional information</h3>
//         <ul>
//           <li className={styles.informLink}>
//             <NavLink to="cast" state={{ from: location.state?.from ?? '/' }}>
//               Cast
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="reviews" state={{ from: location.state?.from ?? '/' }}>
//               Reviews
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Outlet />
//       </Suspense>
//     </>
//   );
// };

export const re = ''
