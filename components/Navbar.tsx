import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const Navbar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>AWS</MenubarTrigger>

        <MenubarContent>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Cloud Practitioner</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarSeparator />

              <MenubarItem>
                <Link href="/aws/cloud-practitioner/practise-exam/1">
                  Practise Exam #1
                </Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
