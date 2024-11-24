import React, { useState } from "react";
import { Theme } from "@my/ui";
import { useComposedState } from "protolib/lib/useComposedState";
import { Text } from "protolib/components/Text";
import { VStack } from "protolib/components/VStack";
import { useEditor } from "protolib/visualui/useEdit";
import { BigTitle } from "protolib/components/BigTitle";
import { UIWrapLib, UIWrap } from "protolib/visualui/visualuiWrapper";
import { API, Protofy } from "protobase";
import { withSession } from "protolib/lib/Session";
import { Page } from "protolib/components/Page";
import { SSR } from "protolib/lib/SSR";
import { DefaultLayout } from "../layout/DefaultLayout";
import { context } from "../bundles/uiContext";
import { useRouter } from "solito/navigation";
import { Objects } from "../bundles/objects";
import { ButtonSimple } from "protolib/components/ButtonSimple";
import { HStack } from "protolib/components/HStack";
import { Spacer } from "protolib/components/Spacer";

const isProtected = Protofy("protected", false);
Protofy("pageType", "default");

const PageComponent = ({ currentView, setCurrentView, props }: any) => {
  const { cs, states } = useComposedState();

  const router = useRouter();
  context.onRender(async () => {});
  return (
    <Page minHeight="100vh">
      <DefaultLayout title="Protofy" description="Made with love from Barcelona">
        {}
        <VStack mt="$10" ai="center">
          <BigTitle>Mayko</BigTitle>
          <Spacer size="$7"></Spacer>
          <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/inoculate")} margin="$6" theme="red" size="$5">
            inoculate
          </ButtonSimple>
          <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/forward")} margin="$4">
            forward
          </ButtonSimple>
          <VStack>
            <HStack>
              <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/left")} alignSelf="start" margin="$4">
                Left
              </ButtonSimple>
              <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/stop")} margin="$4">
                Stop
              </ButtonSimple>
              <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/right")} alignSelf="start" margin="$4">
                Right
              </ButtonSimple>
            </HStack>
          </VStack>
          <ButtonSimple onPress={(e) => context.fetch("/api/v1/automations/backward")} margin="$4">
            backward
          </ButtonSimple>
        </VStack>
      </DefaultLayout>
    </Page>
  );
};

const cw = UIWrapLib("@my/ui");

export default {
  route: Protofy("route", "/controller"),
  component: (props) => {
    const [currentView, setCurrentView] = useState("default");

    return useEditor(<PageComponent currentView={currentView} setCurrentView={setCurrentView} {...props} />, {
      path: "/packages/app/pages/controller.tsx",
      context: {
        currentView: currentView,
        setCurrentView: setCurrentView,
        Objects: Objects,
      },
      components: {
        ...UIWrap("DefaultLayout", DefaultLayout, "../../../layout/DefaultLayout"),
        ...cw("Theme", Theme),
      },
    });
  },
  getServerSideProps: SSR(async (context) => withSession(context, isProtected ? Protofy("permissions", []) : undefined)),
};
