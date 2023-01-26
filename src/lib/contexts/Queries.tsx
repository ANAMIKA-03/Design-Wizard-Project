import { gql } from "@apollo/client";
export const userCompositions = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_compositions(filter: $filter, token: $token) {
      active
      title
      keywords
      templateId
      compositionId
      customSize
      version
      designType
      thumb
      composer_object
      categoryId
      modifiedAt
      statusId
    }
  }
`;
export const GetCategories = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_categorizations(filter: $filter, token: $token) {
      active
      content
      id
      imageUrl
      type
      name
      dwParentIds
      templates {
        templateId
        composer_object
      }
    }
  }
`;
export const resendEmail = gql`
  query MyQuery($token: String!) {
    GET_users_me_emailVerify(token: $token)
  }
`;

//InAppNotification Query Execution

export const inAppNotification = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_inAppNotifications(filter: $filter, token: $token) {
      compactBody
      compactTitle
    }
  }
`;

export const CheckLogin = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me(filter: $filter, token: $token) {
      name
    }
  }
`;

export const myProfile = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me(filter: $filter, token: $token) {
      name
      email
      avatar
      country
    }
  }
`;
export const completeProfileDetails = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me(filter: $filter, token: $token) {
      name
      userId
      username
      avatar
      created
      country
      email
      emailVerified
      features
      identities
      limits {
        credits
        videoCredits
        download
        share
        videoDownload
        videoShare
        totalCredits
        totalVideoCredits
      }
      marketingConsent
      paidSubscriber
      preferences {
        templateSearch
        templateNegativeSearch
        assetSearch
        assetNegativeSearch
        segmentsSelectedByUser
      }
      roles {
        name
        realm
      }
      stripeCardInfo {
        exp_year
        exp_month
        last4
        brand
      }
    }
  }
`;
export const closeAccount = gql`
  mutation MyMutation($token: String!) {
    POST_users_me_closeAccountRequest(token: $token)
  }
`;
export const confirm_Email = gql`
  mutation MyMutation($uid: String!, $token: String!) {
    POST_users_confirmEmailVerify(uid: $uid, token: $token)
  }
`;

export const DesignCounts = gql`
  query MyQuery($where: String!, $token: String!) {
    GET_users_compositions_count(where: $where, token: $token) {
      count
    }
  }
`;
export const DeleteQuery = gql`
  mutation MyMutation(
    $compositionId: String!
    $ownerId: String!
    $token: String!
  ) {
    DELETE_users_compositions(
      compositionId: $compositionId
      ownerId: $ownerId
      token: $token
    ) {
      count
    }
  }
`;
export const Purchased = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me_usage(filter: $filter, token: $token) {
      userId
      compositionId
      realm
      categoryId
      featureId
      hash
      compositionTitle
      createdAt
      composer_object
      videoCredits
      credits
    }
  }
`;

export const templateCategories = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_templateCategories(filter: $filter, token: $token) {
      id
      name
      height
      order
      featuredTemplate
      parents
      visible
      width
      displayHeight
      displayWidth
      dpi
      webQualityDownload
    }
  }
`;

export const TemplateSearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_templates_search(input: $input, token: $token) {
      total
      templates {
        templateId
        composer_object
      }
      hits {
        _id
        _source {
          categorizationCount
          price
          thumb
          preview
        }
        sort
        _type
      }
      templates {
        composer_object
      }
    }
  }
`;

export const SystemPref = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    PUT_users_me(input: $input, token: $token) {
      name
      userId
    }
  }
`;

export const requestInfo = gql`
  query MyQuery($token: String!) {
    GET_users_me_requestUserData(token: $token)
  }
`;

export const ImageSearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_assets_search(input: $input, token: $token)
  }
`;

export const UserFavourites = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_favorites(filter: $filter, token: $token) {
      id
      _id
      folders
      favoriteType
      _source {
        thumb
        height
      }
    }
  }
`;

export const TextBlockSearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_textBlocksSearch(input: $input, token: $token) {
      total
      textBlocks {
        aspect
        boundingBox {
          width
          height
          aspect
        }
        content
        id
        layers {
          fontColor
          fontFamily
          fontSize
          fontStyle
          fontWeight
          height
          left
          lineHeight
          textAlign
          top
          value
          width
        }
      }
    }
  }
`;

export const AddFavourite = gql`
  mutation MyMutation($input: FavoritesAddInput!, $token: String!) {
    POST_favorites_add(input: $input, token: $token) {
      favoriteType
    }
  }
`;

export const DeleteFavourite = gql`
  mutation MyMutation($id: String!, $token: String!) {
    DELETE_users_me_favoriteDelete(id: $id, token: $token) {
      count
    }
  }
`;

export const UploadImage = gql`
  mutation MyMutation($input: UserUploadInput!, $token: String!) {
    POST_users_me_userUpload(input: $input, token: $token) {
      width
      thumb
      height
      key
      fileName
      id
    }
  }
`;

export const GetUserUpload = gql`
  query MyQuery($token: String!) {
    GET_users_uploads(token: $token) {
      thumb
      ownerId
      fileName
      height
      width
    }
  }
`;

export const GetFileV2 = gql`
  query MyQuery($access_token: String!, $fileData: String!) {
    GET_getFileV2(access_token: $access_token, fileData: $fileData)
  }
`;

export const VideoText = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_animations(filter: $filter, token: $token) {
      animationId
    }
  }
`;

export const changeName = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    PUT_users_me(input: $input, token: $token) {
      name
    }
  }
`;
export const changeCountry = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    PUT_users_me(input: $input, token: $token) {
      country
    }
  }
`;

export const promoCode = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_claimPromo(input: $input, token: $token) {
      status
      message
      code
    }
  }
`;

export const password = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_updatePassword(input: $input, token: $token) {
      changed
      accessToken {
        userId
      }
    }
  }
`;

export const updatedPosts = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    PUT_users_me(input: $input, token: $token) {
      name
      userId
      preferences {
        savedCategories
      }
    }
  }
`;

export const resetPassword = gql`
  mutation MyMutation($input: AWSJSON!) {
    POST_request_password_reset(input: $input)
  }
`;

export const resetPasswordMailApi = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_reset_password(input: $input, token: $token)
  }
`;

export const getUserPosts = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me(filter: $filter, token: $token) {
      name
      preferences {
        savedCategories
      }
    }
  }
`;

export const signUp = gql`
  mutation MyMutation($input: AWSJSON!) {
    POST_users(input: $input) {
      name
    }
  }
`;

export const login = gql`
  mutation MyMutation($input: LoginUserInput!) {
    POST_users_login(input: $input) {
      avatar
      email
      emailVerified
      id
      name
      userId
      paidSubscriber
      username
      roles {
        name
        realm
      }
      identities
      preferences {
        segmentsSelectedByUser
      }
      limits {
        credits
        totalCredits
        totalVideoCredits
        videoCredits
      }
    }
  }
`;

export const GetVideoSubTypes = gql`
  query MyQuery($token: String!) {
    GET_videoSubTypes(token: $token)
  }
`;

export const GetAssetSubTypes = gql`
  query MyQuery($token: String!) {
    GET_assetSubTypes(token: $token)
  }
`;

export const PostUserComposition = gql`
  mutation MyMutation($input: CompositionInput!, $token: String!) {
    POST_compositions(input: $input, token: $token) {
      ownerId
      compositionId
      active
      categoryId
    }
  }
`;

export const UpdateUserComposition = gql`
  mutation MyMutation(
    $ownerId: String!
    $compositionId: String!
    $input: CompositionInput!
    $token: String!
  ) {
    PUT_users_compositions(
      ownerId: $ownerId
      compositionId: $compositionId
      input: $input
      token: $token
    ) {
      ownerId
      compositionId
      active
      categoryId
    }
  }
`;

export const PublishComposition = gql`
  mutation MyMutation($userId: String!, $input: AWSJSON!, $token: String!) {
    POST_users_publishComposition(userId: $userId, input: $input, token: $token)
  }
`;

export const DownloadImage = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_downloadImages(input: $input, token: $token) {
      url
    }
  }
`;

export const CheckStatus = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_checkDownloadQueue(input: $input, token: $token) {
      status
      files
    }
  }
`;

export const CompositionDL = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_compositionDL(input: $input, token: $token) {
      status
      id
    }
  }
`;

export const logOut = gql`
  mutation MyMutation($token: String!) {
    POST_users_logout(token: $token)
  }
`;

export const UploadFont = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_uploadFont(input: $input, token: $token) {
      storageAfterUpload
      userFont {
        ownerId
      }
    }
  }
`;

export const DeleteFont = gql`
  mutation MyMutation($input: String!, $token: String!) {
    DELETE_users_me_deleteFont(input: $input, token: $token) {
      storageAfterUpload
    }
  }
`;

export const GetFont = gql`
  query MyQuery($token: String!) {
    GET_users_me_userFonts(token: $token) {
      fontStyle
      font
    }
  }
`;

export const GetTutorialsFaq = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_tutorialsFAQs(filter: $filter, token: $token) {
      active
      body
      faqUniqueTitle
      id
      isFAQ
      order
      parentId
      title
      useOrigin
      videoUrl
    }
  }
`;

export const GetTutorialsFaqOrder = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_tutorialCategoriesFAQ(filter: $filter, token: $token) {
      id
      title
      order
    }
  }
`;

export const GetUser = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_me(filter: $filter, token: $token) {
      name
      userId
      id
      username
      avatar
      created
      country
      email
      emailVerified
      features
      identities
      limits {
        credits
        videoCredits
        download
        share
        storage
        videoDownload
        videoShare
        totalCredits
        totalVideoCredits
      }
      marketingConsent
      paidSubscriber
      preferences {
        templateSearch
        templateNegativeSearch
        assetSearch
        assetNegativeSearch
        segmentsSelectedByUser
      }
      roles {
        name
        realm
      }
    }
  }
`;

export const changeavatar = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_uploadAvatar(input: $input, token: $token) {
      provider
      url
    }
  }
`;

export const GetPrice = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_compositions_getPrice(input: $input, token: $token) {
      price
      credits
      videoCredits
      alreadyDownloaded
      assets {
        assetId
        isVideo
        source
        price
        promotion
      }
    }
  }
`;

export const UnlinkProvider = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_unlinkProvider(input: $input, token: $token)
  }
`;

export const tutorialCategories = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_tutorialCategoriesFAQ(filter: $filter, token: $token) {
      title
      order
    }
  }
`;
export const AccountDetails = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_admin(filter: $filter, token: $token) {
      name
      email
      beta
      compositionCount
      active
      id
    }
  }
`;

export const LeftSideTutorial = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_tutorialsFAQs(filter: $filter, token: $token) {
      title
      body
      isFAQ
      id
      active
      faqUniqueTitle
      order
      parentId
      useOrigin
      videoUrl
    }
  }
`;
export const NotificationDetails = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_inAppNotifications(filter: $filter, token: $token) {
      compactBody
      compactTitle
      name
      fullBody
      useForPlan
      startAt
      durationInDays
      thumbnail
      offersLeft
      fullTitle
      id
    }
  }
`;
export const NotificationData = gql`
  mutation MyMutation($input: InAppNotificationInput!, $token: String!) {
    POST_inAppNotifications(input: $input, token: $token) {
      name
      compactTitle
      fullTitle
      useForPlan
      fullBody
      compactBody
      durationInDays
      offersLeft
      thumbnail
      startAt
    }
  }
`;

export const AdminNotificationPutData = gql`
  mutation MyMutation(
    $inAppNotificationsId: String!
    $input: InAppNotificationInput!
    $token: String!
  ) {
    PUT_inAppNotifications(
      inAppNotificationsId: $inAppNotificationsId
      input: $input
      token: $token
    ) {
      compactBody
      compactTitle
      name
      fullBody
      fullTitle
      useForPlan
      startAt
      durationInDays
      thumbnail
      offersLeft
      id
    }
  }
`;
export const AdminAccountCount = gql`
  query MyQuery($where: String!, $token: String!) {
    GET_users_count(where: $where, token: $token)
  }
`;
export const AdminUserActivate = gql`
  mutation MyMutation($id: String!, $input: activate!, $token: String!) {
    PUT_users_activate(id: $id, input: $input, token: $token)
  }
`;
export const AdminPurchaseHistoryCount = gql`
  query MyQuery($where: String!, $token: String!) {
    GET_usage_count(where: $where, token: $token)
  }
`;

//
export const PurchaseHistoryDownloadComposition = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_compositionDL(input: $input, token: $token) {
      status
      id
    }
  }
`;

export const usersComposition = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_users_compositions(filter: $filter, token: $token) {
      active
      title
      keywords
      templateId
      customSize
      version
      designType
      thumb
      statusId
    }
  }
`;
export const AllDesignComposition = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_all_design_compositions(filter: $filter, token: $token) {
      compositionId
      categoryId
      compositionRealm
      email
      ownerId
      createdAt
      modifiedAt
      statusId
      active
      title
    }
  }
`;

export const AllDesignCount = gql`
  query MyQuery($where: String!, $token: String!) {
    GET_all_design_compositions_count(where: $where, token: $token) {
      count
    }
  }
`;

export const TemplateDesign = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_templates(filter: $filter, token: $token) {
      categoryId
      templateId
      composer_object
      email
      title
      statusId
    }
  }
`;

export const TemplateCount = gql`
  query MyQuery($where: String!, $token: String!) {
    GET_templates_count(where: $where, token: $token) {
      count
    }
  }
`;
//export const tutorialCategories = gql`
//query MyQuery ($filter: String!, $token: String!){
//GET_tutorialCategoriesFAQ(filter: $filter, token: $token) {
//title
//order
//}
//}
//`
// export const AccountDetails = gql`
// query MyQuery ($filter: String!, $token: String!){
//   GET_users_admin(
//     filter: $filter, token: $token
//   )  {
//    	name
//     email
//     status
//     compositionCount

//   }
// }
// `;
export const TutorialsFAQ = gql`
  mutation MyMutation(
    $tutorialsFAQsId: String!
    $input: TutorialsFAQInput!
    $token: String!
  ) {
    PUT_tutorialsFAQ(
      tutorialsFAQsId: $tutorialsFAQsId
      input: $input
      token: $token
    ) {
      title
      body
      faqUniqueTitle
      useOrigin
      videoUrl
      isFAQ
      parentId
      active
      order
      id
    }
  }
`;
export const CategoriesFAQ = gql`
  mutation MyMutation($input: TutorialCategoriesFAQInput!, $token: String!) {
    POST_tutorialCategoriesFAQ(input: $input, token: $token) {
      title
      order
      id
    }
  }
`;
export const tutorialCategoriesFAQ = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_tutorialCategoriesFAQ(filter: $filter, token: $token) {
      title
      order
      id
    }
  }
`;

export const TaxamoSubscribe = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_users_me_taxamoSubscribe(input: $input, token: $token) {
      userId
      email
    }
  }
`;

export const PosttutorialsFAQ = gql`
  mutation MyMutation($input: TutorialsFAQInput!, $token: String!) {
    POST_tutorialsFAQ(input: $input, token: $token) {
      title
      faqUniqueTitle
      videoUrl
      body
      isFAQ
      parentId
      active
      order
    }
  }
`;

export const AdminAvailableTask = gql`
  query MyQuery($filter: String!, $token: String!) {
    GET_waveflowTasks(filter: $filter, token: $token) {
      title
      description
      deadline
      id
      link
    }
  }
`;

export const AssetsSearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_assets_search(input: $input, token: $token)
  }
`;

export const PUTtutorialCategoriesFAQ = gql`
  mutation MyMutation(
    $tutorialCategoriesFAQsId: String!
    $input: TutorialCategoriesFAQInput!
    $token: String!
  ) {
    PUT_tutorialCategoriesFAQ(
      tutorialCategoriesFAQsId: $tutorialCategoriesFAQsId
      input: $input
      token: $token
    ) {
      title
      order
    }
  }
`;

export const PUT_tutorialsFAQ = gql`
  mutation MyMutation(
    $tutorialsFAQsId: String!
    $input: TutorialsFAQInput!
    $token: String!
  ) {
    PUT_tutorialsFAQ(
      tutorialsFAQsId: $tutorialsFAQsId
      input: $input
      token: $token
    ) {
      title
      body
    }
  }
`;

export const POSTassetssearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_assets_search(input: $input, token: $token)
  }
`;

export const REVISIONassetssearch = gql`
  mutation MyMutation($input: AWSJSON!, $token: String!) {
    POST_assets_search(input: $input, token: $token)
  }
`;
