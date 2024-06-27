import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute,
  CommonActions,
} from '@react-navigation/native';

export const useRedirect = () => {
  const { navigate, goBack, dispatch } = useNavigation<NavigationProp<ParamListBase>>();
  const { params } = useRoute();
  const goTo = (path: string, object?: any) => navigate(path, { ...object });

  const setParamsAndGoBack = (params: any) => {
    dispatch((state) => {
      const routes = [...state.routes];
      routes[state.index - 1] = {
        ...routes[state.index - 1],
        params,
      };
      return CommonActions.reset({
        ...state,
        routes,
        index: state.index - 1,
      });
    });
  };

  return { goTo, goBack, setParamsAndGoBack, params };
};
