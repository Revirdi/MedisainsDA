import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Content from "../Content";
import CreateCompany from "./CreateCompany";
import { useSearchParams } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./company.module.css";
import { Link } from "react-router-dom";

export default function CompanyList({
  accessToken,
  addNewCompanyMutation,
  updateCompanyMutation,
  deleteCompanyMutation,
  data,
  setCompanyQuery,
  companyQuery,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (e) => {
    setCompanyQuery({ ...companyQuery, ["page"]: e.selected + 1 });
    setSearchParams({ page: e.selected + 1 });
  };

  const onSearchHandler = () => {
    setCompanyQuery({ ...companyQuery, ["companyName"]: search });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      setCompanyQuery({ ...companyQuery, ["companyName"]: search });
    }
  };
  const RenderData = () => {
    return data?.data?.data?.map((data) => {
      return (
        <CompanyCard
          key={data.id}
          data={data}
          updateCompanyMutation={updateCompanyMutation}
          deleteCompanyMutation={deleteCompanyMutation}
          accessToken={accessToken}
        />
      );
    });
  };
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        Company Management
      </Text>
      <Box minH="85vh" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Flex
          width="100%"
          justifyContent={"space-between"}
          marginBottom={8}
          marginTop={4}
          marginRight={8}
        >
          <InputGroup size="md" width={"20%"} marginLeft={8}>
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onKeyDownHandler}
            />
            <InputRightElement rounded={8}>
              <Button
                variant={"unstyle"}
                bgColor={"transparent"}
                rounded={8}
                onClick={onSearchHandler}
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            marginRight={8}
            colorScheme="telegram"
            width={"max-content"}
            onClick={onOpen}
          >
            Add New Company
          </Button>
        </Flex>
        <TableContainer
          justifyContent={"center"}
          border={"1px"}
          borderRadius="10px"
          mx={"3%"}
          mb="4%"
        >
          <Table variant="striped" colorScheme="teal" size="md">
            <TableCaption>List of Company</TableCaption>
            <Thead>
              <Tr justifyContent={"center"}>
                <Th>Company Name</Th>
                <Th>Phone Number</Th>
                <Th>Creator</Th>
                <Th>Sales PIC</Th>
                <Th textAlign={"center"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <RenderData />
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <CreateCompany
        isOpen={isOpen}
        onClose={onClose}
        addNewCompanyMutation={addNewCompanyMutation}
        accessToken={accessToken}
      />
      {data && (
        <ReactPaginate
          forcePage={companyQuery.page - 1}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(data.data.totalPages / companyQuery.pageSize)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.pagenum}
          previousLinkClassName={styles.pagenum}
          nextLinkClassName={styles.pagenum}
          activeLinkClassName={styles.active}
          disabledClassName={styles.disabled}
        />
      )}
    </Content>
  );
}
