import { storyActionTypes } from '../reducers/storyReducer';
import {
    fetchListStory,
    fetchDetailStory,
    fetchCreateStory,
    fetchUpdateStory,
    fetchHeartStory,
    fetchUnHeartStory,
    fetchListComment,
    fetchComment,
    fetchReplyComment
  } from '../api/story'

export const FetchStoryListRequest = () => {
    return async (dispatch) => {
        fetchListStory().then(rs => {
            dispatch(FetchStoryListSuccess(rs.data.story))
        })
        .catch(e =>{
            dispatch(FetchStoryListFailure())
        })
            
    }
}
export const FetchStoryListFailure = () => {
    return {
        type: storyActionTypes.FETCH_STORY_LIST_FAILURE,
        payload: {
            message: 'Get Story List Failed!'
        }
    }
}
export const FetchStoryListSuccess = (payload) => {
    return {
        type: storyActionTypes.FETCH_STORY_LIST_SUCCESS,
        payload: payload
    }
}
/**
 * TOGGLE LIKE Story ACTIONS
 */
export const ToggleLikeStoryRequest = (id, status) => {
    return async (dispatch, getState) => {
        let storyList = getState().storyList
        let me = getState().user.user?.userInfo?._id
        if(!status){
            fetchHeartStory(id).then(res =>{
                if(res.data){
                    storyList = storyList.map((story) => {
                        if (story._id === id) {
                            story = { ...story, hearts: [...story.hearts, me] }
                        }
                        return story
                    })

                    dispatch(ToggleLikeStorySuccess(storyList))
                }
                else {
                    dispatch(ToggleLikeStoryFailure())
                }
            }).catch (e =>{
                dispatch(ToggleLikeStoryFailure())
            })

        }
        else{
            fetchUnHeartStory(id).then(res =>{
                if(res.data){
                    storyList = storyList.map((story) => {
                        if (story._id === id) {
                            story = { ...story, hearts: story.hearts.filter(e => e !== me) }
                        }
                        return story
                    })
                    dispatch(ToggleLikeStorySuccess(storyList))
                }
                else {
                    dispatch(ToggleLikeStoryFailure())
                }
            }).catch (e =>{
                dispatch(ToggleLikeStoryFailure())
            })
            
        }
    }
}
export const ToggleLikeStoryFailure = () => {
    return {
        type: storyActionTypes.TOGGLE_LIKE_STORY_FAILURE,
        payload: {
            message: 'Can not load more Storys!'
        }
    }
}
export const ToggleLikeStorySuccess = (payload) => {
    return {
        type: storyActionTypes.TOGGLE_LIKE_STORY_SUCCESS,
        payload: payload
    }
}
/**
 * LOADING MORE ACTIONS 
 */
// export const LoadMoreStoryListRequest = () => {
//     return async (dispatch) => {
        
//     }
// }
// export const LoadMoreStoryListFailure = () => {
//     return {
//         type: storyActionTypes.LOAD_MORE_STORY_LIST_FAILURE,
//         payload: {
//             message: 'Can not load more Storys!'
//         }
//     }
// }
// export const LoadMoreStoryListSuccess = (payload) => {
//     return {
//         type: storyActionTypes.LOAD_MORE_STORY_LIST_SUCCESS,
//         payload: payload
//     }
// }
// /**
//  * Story COMMENTS ACTIONS
//  */
// export const StoryCommentRequest = (StoryId,
//     content,
//     StoryData,
//     setStory => {
//     return async (dispatch) => {
       
//     }
// })
// export const StoryCommentFailure = () => {
//     return {
//         type: storyActionTypes.COMMENT_STORY_FAILURE,
//         payload: {
//             message: 'Can not load more Storys!'
//         }
//     }
// }
// export const StoryCommentSuccess = (payload) => {
//     return {
//         type: storyActionTypes.COMMENT_STORY_SUCCESS,
//         payload: payload
//     }
// }


// //CREATE Story ACTION
// export const CreateStoryRequest = (StoryData) => {
//     return async (dispatch) => {
        
//     }
// }
// export const CreateStoryFailure = () => {
//     return {
//         type: storyActionTypes.CREATE_STORY_FAILURE,
//         payload: {
//             message: 'Can not Story this Story!'
//         }
//     }
// }
// // export const CreateStorySuccess = (payload) => {
// //     return {
// //         type: storyActionTypes.CREATE_Story_SUCCESS,
// //         payload: payload
// //     }
// // }
// //UPDATE Story ACTION
// export const UpdateStoryRequest = (uid, updatedData) => {
//     return async (dispatch) => {
        
//     }
// }
// export const UpdateStoryFailure = () => {
//     return {
//         type: storyActionTypes.UPDATE_STORY_FAILURE,
//         payload: {
//             message: 'Can not update Story now!'
//         }
//     }
// }
// export const UpdateStorySuccess = (payload) => {
//     return {
//         type: storyActionTypes.UPDATE_STORY_SUCCESS,
//         payload: payload
//     }
// }
