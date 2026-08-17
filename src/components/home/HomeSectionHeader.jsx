import { HStack, Heading } from "@chakra-ui/react";

function HomeSectionHeader({ icon: Icon, title }) {
  return (
    <HStack gap="3" align="center">
      {Icon ? (
        <Icon
          size={28}
          strokeWidth={1.6}
          color="var(--resaeni-colors-accent-primary)"
        />
      ) : null}

      <Heading as="h2" textStyle="pageTitle" color="fg.heading">
        {title}
      </Heading>
    </HStack>
  );
}

export default HomeSectionHeader;
