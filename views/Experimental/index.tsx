import { Layout } from "@/components/Layout";
import { PageTitleSetter } from "@/components/PageTitleProvider";

export const ExperimentalView = () => {
  return (
    <>
      <PageTitleSetter title="Experimental" />
      <Layout>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="uppercase text-color-arnecke-black font-bold flex items-center gap-2">
            circle
            <hr className="flex-1 w-30 border-t-16 border-red-600" />
            experimental arnecke projects
          </h1>
        </div>
      </Layout>
    </>
  );
};
