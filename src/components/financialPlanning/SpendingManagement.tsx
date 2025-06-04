import Button from "@/UI/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const SpendingManagement = () => {
  return (
    <>
      <Drawer
      // dismissible={false}
      // open={openDrawer}
      // onOpenChange={setOpenDrawer}
      >
        <DrawerTrigger asChild>
          <div className="flex justify-center md:justify-end items-center">
            <Button
              className="text-white"
              buttonText="Add Transaction"
              btnColor="bg-blue-500"
            />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="flex justify-center">
                Add Transaction
              </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                buttonText="Submit"
                // onClick={handleSubmit}
                btnColor="bg-blue-500"
                type="submit"
              />

              <DrawerClose asChild>
                <Button
                  buttonText="Cancel"
                  //   onClick={closeDrawer}
                  btnColor="bg-blue-500"
                />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SpendingManagement;
