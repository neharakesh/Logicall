import Joi from 'joi';
const { object, string, number } = Joi;


const movieSchema = object({
  title: string().required(),
  type: string().valid('Movie', 'TV Show').required(),
  director: string().optional(),
  budget: number().optional(),
  location: string().optional(),
  duration: string().optional(),
  year: number().optional(),
  details: string().optional(),
});

export default movieSchema;
