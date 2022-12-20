import { createSlice } from '@reduxjs/toolkit';
import { getProductReviews } from '../actions';

const initialState = {
  reviewList: {
    allReviews: [],
    renderedReviews: [],
    renderedReviewsCt: 2,
    sort: 'relevant',
    filter: [],
    query: '',
  },
  page: {
    isReviewForm: false,
    isReviewsUpdated: false,
  },
};

const reviewComponentSlice = createSlice({
  name: 'Review Component',
  initialState,
  reducers: {
    updateRenderedReviews: (state, action) => {
      state.reviewList.renderedReviews = action.payload;
    },
    updateIsReviewForm: (state, action) => {
      state.page.isReviewForm = !state.page.isReviewForm;
    },
    updateIsReviewsUpdated: (state, action) => {
      state.page.isReviewsUpdated = !state.page.isReviewsUpdated;
    },
    updateSort: (state, action) => {
      state.reviewList.sort = action.payload;
    },
    updateFilter: (state, action) => {
      state.reviewList.filter = action.payload;
    },
    updateQuery: (state, action) => {
      state.reviewList.query = action.payload;
    },
    updateRenderedReviewCt: (state, action) => {
      state.reviewList.renderedReviewsCt += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.reviewList.allReviews = action.payload.results;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.reviewList.allReviews = [];
        console.log('Product Reviews Rejected');
      });
  },
});

export const {
  updateRenderedReviews, updateIsReviewForm,
  updateIsReviewsUpdated, updateSort,
  updateRenderedReviewCt, updateFilter,
  updateQuery,
} = reviewComponentSlice.actions;

export default reviewComponentSlice.reducer;