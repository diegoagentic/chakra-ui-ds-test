import { useState, useMemo } from 'react'
import {
    Box, Flex, Grid, Heading, Text, Button, Input, InputGroup, InputLeftElement,
    Avatar, IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Card, CardBody, CardHeader, VStack, Divider, Tag, SimpleGrid, ButtonGroup, useColorMode, useColorModeValue, Collapse,
    Menu, MenuButton, MenuList, MenuItem, MenuDivider, CheckboxGroup, Checkbox,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import {
    SearchIcon, BellIcon, CalendarIcon, AddIcon, CopyIcon, EmailIcon,
    ViewIcon, ArrowForwardIcon, ChevronRightIcon, SettingsIcon, MoonIcon, SunIcon, ChevronDownIcon, EditIcon, DeleteIcon
} from '@chakra-ui/icons'
import { FaHome, FaBox, FaIndustry, FaClipboardList, FaTruck, FaTh, FaList, FaSignOutAlt, FaUser, FaMapMarkerAlt, FaCheckCircle, FaClock } from 'react-icons/fa'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", avatar: "AutoManfacture Co.", colorScheme: 'gray' },
    { id: "#ORD-2054", customer: "TechDealer Solutions", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", avatar: "TechDealer Solutions", colorScheme: 'blue' },
    { id: "#ORD-2053", customer: "Urban Living Inc.", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", avatar: "Urban Living Inc.", colorScheme: 'green' },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [isMainOpen, setIsMainOpen] = useState(true)
    const [isOperationsOpen, setIsOperationsOpen] = useState(true)
    const { colorMode, toggleColorMode } = useColorMode()
    const ThemeIcon = colorMode === 'light' ? MoonIcon : SunIcon

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [trackingOrder, setTrackingOrder] = useState<any>(null)

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, selectedStatuses])

    const bgMain = useColorModeValue('gray.50', 'gray.900')
    const bgSidebar = useColorModeValue('white', 'gray.800')
    const bgCard = useColorModeValue('#FFFFFF', '#1A202C') // Explicit hex for Recharts compatibility
    const borderColor = useColorModeValue('#E2E8F0', '#2D3748') // Explicit hex for Recharts compatibility
    const textColorMuted = useColorModeValue('gray.500', 'gray.400')
    const textColorMain = useColorModeValue('gray.900', 'white')
    const chartFill = useColorModeValue('#1A202C', '#E2E8F0')
    const chartStroke = useColorModeValue('#1A202C', '#E2E8F0')

    return (
        <Flex minH="100vh" bg={bgMain}>
            {/* Sidebar */}
            <Flex
                direction="column"
                w="250px"
                bg={bgSidebar}
                borderRight="1px"
                borderColor={borderColor}
                display={{ base: 'none', md: 'flex' }}
            >
                <Flex h="16" align="center" px="6" borderBottom="1px" borderColor="gray.100">
                    <Flex align="center" justify="center" w="24" h="8" bg="gray.100" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="gray.500">
                        Tenant Logo
                    </Flex>
                </Flex>

                <VStack flex="1" p="4" align="stretch" spacing="4" overflowY="auto">
                    {/* Main Category */}
                    <Box>
                        <Flex
                            align="center"
                            justify="space-between"
                            w="full"
                            px="3"
                            py="2"
                            cursor="pointer"
                            onClick={() => setIsMainOpen(!isMainOpen)}
                            role="group"
                            borderRadius="md"
                            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                        >
                            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="gray.500" _groupHover={{ color: textColorMain }}>Main</Text>
                            {isMainOpen ? <ChevronDownIcon w={3} h={3} color="gray.500" /> : <ChevronRightIcon w={3} h={3} color="gray.500" />}
                        </Flex>
                        <Collapse in={isMainOpen} animateOpacity>
                            <VStack align="stretch" spacing="1" mt="1" px="2">
                                <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaHome />} colorScheme="gray" isActive>Overview</Button>
                            </VStack>
                        </Collapse>
                    </Box>

                    {/* Operations Category */}
                    <Box>
                        <Flex
                            align="center"
                            justify="space-between"
                            w="full"
                            px="3"
                            py="2"
                            cursor="pointer"
                            onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                            role="group"
                            borderRadius="md"
                            _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                        >
                            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="gray.500" _groupHover={{ color: textColorMain }}>Operations</Text>
                            {isOperationsOpen ? <ChevronDownIcon w={3} h={3} color="gray.500" /> : <ChevronRightIcon w={3} h={3} color="gray.500" />}
                        </Flex>
                        <Collapse in={isOperationsOpen} animateOpacity>
                            <VStack align="stretch" spacing="1" mt="1" px="2">
                                <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaBox />} color="gray.600">Inventory</Button>
                                <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaIndustry />} color="gray.600">Production</Button>
                                <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaClipboardList />} color="gray.600">Orders</Button>
                                <Button variant="ghost" justifyContent="flex-start" leftIcon={<FaTruck />} color="gray.600">Logistics</Button>
                            </VStack>
                        </Collapse>
                    </Box>
                </VStack>

                <Box p="4" borderTop="1px" borderColor="gray.100">
                    <Flex align="center" gap="3" p="2" borderRadius="md" _hover={{ bg: 'gray.50' }}>
                        <Avatar size="sm" name="Jhon Doe" bg="gray.300" />
                        <Box flex="1" overflow="hidden">
                            <Text fontSize="sm" fontWeight="medium" isTruncated>Jhon Doe</Text>
                            <Text fontSize="xs" color="gray.500">Admin</Text>
                        </Box>
                        <IconButton aria-label="Logout" icon={<FaSignOutAlt />} size="xs" variant="ghost" onClick={onLogout} />
                    </Flex>
                </Box>
            </Flex>

            {/* Main Content */}
            <Flex direction="column" flex="1" overflow="hidden">
                {/* Header */}
                <Flex h="16" bg={bgCard} borderBottom="1px" borderColor={borderColor} align="center" justify="space-between" px="8">
                    <Flex align="center" gap="2" fontSize="sm" color={textColorMuted}>
                        <Text>Dashboard</Text>
                        <ChevronRightIcon />
                        <Text color={textColorMain} fontWeight="medium">Operational Overview</Text>
                    </Flex>
                    <Flex align="center" gap="4">
                        <InputGroup w="64" size="sm">
                            <InputLeftElement pointerEvents="none"><SearchIcon color="gray.400" /></InputLeftElement>
                            <Input placeholder="Search..." borderRadius="md" />
                        </InputGroup>
                        <Button size="sm" variant="outline" leftIcon={<CalendarIcon />}>Jan 1 - Jan 31, 2025</Button>
                        <IconButton aria-label="Toggle Theme" icon={<ThemeIcon />} onClick={toggleColorMode} variant="ghost" size="sm" color="gray.500" />
                        <IconButton aria-label="Notifications" icon={<BellIcon />} variant="ghost" size="sm" color="gray.500" />
                    </Flex>
                </Flex>

                {/* Scrollable Area */}
                <Box flex="1" overflowY="auto" p="8">
                    <VStack spacing="8" align="stretch">

                        {/* KPI Cards */}
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap="4">
                            <Card boxShadow="sm" bg={bgCard}>
                                <CardBody p="4">
                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500" mb="1">Total Inventory Value</Text>
                                    <Text fontSize="2xl" mb="2">$1.2M</Text>
                                    <Text fontSize="xs" color="green.500" display="flex" alignItems="center" gap="1">
                                        <ArrowForwardIcon transform="rotate(-45deg)" /> +0.2% vs last month
                                    </Text>
                                </CardBody>
                            </Card>
                            <Card boxShadow="sm" bg={bgCard}>
                                <CardBody p="4">
                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500" mb="1">Production Efficiency</Text>
                                    <Text fontSize="2xl" mb="2">88%</Text>
                                    <Text fontSize="xs" color="green.500" display="flex" alignItems="center" gap="1">
                                        <ArrowForwardIcon transform="rotate(-45deg)" /> +3.5% vs last month
                                    </Text>
                                </CardBody>
                            </Card>
                            <Card boxShadow="sm" bg={bgCard}>
                                <CardBody p="4">
                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500" mb="1">Pending Orders</Text>
                                    <Text fontSize="2xl" mb="2">142</Text>
                                    <Text fontSize="xs" color="gray.500">-12 vs yesterday</Text>
                                </CardBody>
                            </Card>
                            <Card boxShadow="sm" bg={bgCard}>
                                <CardBody p="4">
                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="gray.500" mb="1">Low Stock Alerts</Text>
                                    <Text fontSize="2xl" mb="2">15</Text>
                                    <Text fontSize="xs" color="red.500" display="flex" alignItems="center" gap="1">Requires attention</Text>
                                </CardBody>
                            </Card>
                        </Grid>

                        {/* Quick Actions */}
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" color={textColorMuted} mb="4">Quick Actions</Text>
                            <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap="4">
                                <Button variant="outline" h="24" flexDirection="column" gap="2" bg={bgCard} _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}>
                                    <Box p="1" bg="gray.900" color="white" borderRadius="md"><AddIcon boxSize="3" /></Box>
                                    New Order
                                </Button>
                                <Button variant="outline" h="24" flexDirection="column" gap="2" bg={bgCard} _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}>
                                    <CopyIcon boxSize="5" color={textColorMuted} /> Duplicate
                                </Button>
                                <Button variant="outline" h="24" flexDirection="column" gap="2" bg={bgCard} _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}>
                                    <ViewIcon boxSize="5" color={textColorMuted} /> Export PDF
                                </Button>
                                <Button variant="outline" h="24" flexDirection="column" gap="2" bg={bgCard} _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}>
                                    <EmailIcon boxSize="5" color={textColorMuted} /> Send Email
                                </Button>
                                <Button variant="outline" h="24" flexDirection="column" gap="2" bg={bgCard} _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}>
                                    <ViewIcon boxSize="5" color={textColorMuted} /> Templates
                                </Button>
                            </Grid>
                        </Box>

                        {/* Main Charts & Content */}
                        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap="6">

                            {/* Orders Table */}
                            <Box gridColumn={{ lg: 'span 3' }}>
                                <Card boxShadow="sm">
                                    <CardHeader display="flex" justifyContent="space-between" alignItems="center" pb="2">
                                        <Heading size="md">Recent Orders</Heading>
                                        <Flex gap="3" align="center">
                                            <InputGroup size="sm" w="56">
                                                <InputLeftElement pointerEvents="none"><SearchIcon color="gray.400" /></InputLeftElement>
                                                <Input
                                                    placeholder="Search orders..."
                                                    borderRadius="md"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </InputGroup>
                                            <ButtonGroup size="sm" isAttached variant="outline">
                                                <IconButton
                                                    aria-label="List View"
                                                    icon={<FaList />}
                                                    isActive={viewMode === 'list'}
                                                    onClick={() => setViewMode('list')}
                                                />
                                                <IconButton
                                                    aria-label="Grid View"
                                                    icon={<FaTh />}
                                                    isActive={viewMode === 'grid'}
                                                    onClick={() => setViewMode('grid')}
                                                />
                                            </ButtonGroup>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
                                                    Status
                                                </MenuButton>
                                                <MenuList minW="240px">
                                                    <CheckboxGroup
                                                        value={selectedStatuses}
                                                        onChange={(values) => setSelectedStatuses(values as string[])}
                                                    >
                                                        <VStack align="start" px="3" py="2" spacing="2">
                                                            {['Pending Review', 'In Production', 'Shipped'].map((status) => (
                                                                <Checkbox key={status} value={status} w="full">
                                                                    {status}
                                                                </Checkbox>
                                                            ))}
                                                        </VStack>
                                                    </CheckboxGroup>
                                                    <MenuDivider />
                                                    <MenuItem onClick={() => setSelectedStatuses([])} closeOnSelect={true}>
                                                        <Text fontSize="xs" color="gray.500">Clear Filter</Text>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Flex>
                                    </CardHeader>
                                    <CardBody>
                                        {viewMode === 'list' ? (
                                            <TableContainer>
                                                <Table variant="simple">
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Order ID</Th>
                                                            <Th>Customer</Th>
                                                            <Th>Amount</Th>
                                                            <Th>Status</Th>
                                                            <Th>Due Date</Th>
                                                            <Th isNumeric>Actions</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {filteredOrders.map((order) => (
                                                            <>
                                                                <Tr
                                                                    key={order.id}
                                                                    cursor="pointer"
                                                                    _hover={{ bg: "gray.50", _dark: { bg: "gray.700" } }}
                                                                    bg={expandedIds.has(order.id) ? useColorModeValue("gray.50", "gray.700") : undefined}
                                                                    onClick={() => toggleExpand(order.id)}
                                                                >
                                                                    <Td fontWeight="medium" display="flex" alignItems="center" gap={2}>
                                                                        {expandedIds.has(order.id) ? <ChevronDownIcon color="gray.400" /> : <ChevronRightIcon color="gray.400" />}
                                                                        {order.id}
                                                                    </Td>
                                                                    <Td>
                                                                        <Flex align="center" gap="2">
                                                                            <Avatar size="xs" name={order.avatar} />
                                                                            <Text fontSize="sm">{order.customer}</Text>
                                                                        </Flex>
                                                                    </Td>
                                                                    <Td>{order.amount}</Td>
                                                                    <Td><Tag colorScheme={order.colorScheme}>{order.status}</Tag></Td>
                                                                    <Td color="gray.500">{order.date}</Td>
                                                                    <Td isNumeric onClick={(e) => e.stopPropagation()}>
                                                                        <Menu isLazy>
                                                                            <MenuButton as={IconButton} aria-label="More" icon={<SettingsIcon />} size="xs" variant="ghost" rounded="full" />
                                                                            <MenuList>
                                                                                <MenuItem icon={<ViewIcon />} onClick={onNavigateToDetail}>
                                                                                    View Details
                                                                                </MenuItem>
                                                                                <MenuItem icon={<EditIcon />}>
                                                                                    Edit
                                                                                </MenuItem>
                                                                                <MenuItem icon={<DeleteIcon />}>
                                                                                    Delete
                                                                                </MenuItem>
                                                                                <MenuItem icon={<EmailIcon />}>
                                                                                    Contact
                                                                                </MenuItem>
                                                                            </MenuList>
                                                                        </Menu>
                                                                    </Td>
                                                                </Tr>
                                                                {expandedIds.has(order.id) && (
                                                                    <Tr bg={useColorModeValue("gray.50", "gray.800")} _hover={{ bg: useColorModeValue("gray.50", "gray.800") }}>
                                                                        <Td colSpan={6} p={0}>
                                                                            <Box p={6}>
                                                                                <VStack align="stretch" spacing={6}>
                                                                                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={4}>
                                                                                        <Flex align="start" gap={3}>
                                                                                            <Avatar size="md" icon={<FaUser />} bg="gray.200" color="gray.500" />
                                                                                            <Box>
                                                                                                <Text fontSize="sm" fontWeight="medium">Sarah Johnson</Text>
                                                                                                <Text fontSize="xs" color="gray.500">Project Manager</Text>
                                                                                            </Box>
                                                                                        </Flex>
                                                                                        <SimpleGrid columns={2} spacing={8}>
                                                                                            <Box>
                                                                                                <Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">Location</Text>
                                                                                                <Flex align="center" gap={1.5} fontSize="sm">
                                                                                                    <FaMapMarkerAlt color="gray" />
                                                                                                    NY, USA
                                                                                                </Flex>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">Project ID</Text>
                                                                                                <Text fontSize="sm">PRJ-24-87</Text>
                                                                                            </Box>
                                                                                        </SimpleGrid>
                                                                                    </Flex>

                                                                                    <Box position="relative" py={2}>
                                                                                        <Box position="absolute" top="15px" left="0" w="full" h="2px" bg={useColorModeValue("gray.200", "gray.700")} />
                                                                                        <Flex justify="space-between" position="relative" zIndex={1}>
                                                                                            {['Order Placed', 'Manufacturing', 'Quality', 'Shipping'].map((step, i) => (
                                                                                                <Flex key={i} direction="column" align="center" bg={useColorModeValue("gray.50", "gray.800")} px={2}>
                                                                                                    <Flex
                                                                                                        w={8} h={8} rounded="full" align="center" justify="center"
                                                                                                        bg={i <= 1 ? "gray.900" : "white"}
                                                                                                        color={i <= 1 ? "white" : "gray.400"}
                                                                                                        borderWidth="1px"
                                                                                                        borderColor={i <= 1 ? "gray.900" : "gray.300"}
                                                                                                        _dark={{
                                                                                                            bg: i <= 1 ? "gray.50" : "gray.900",
                                                                                                            color: i <= 1 ? "gray.900" : "gray.600",
                                                                                                            borderColor: i <= 1 ? "gray.50" : "gray.600"
                                                                                                        }}
                                                                                                    >
                                                                                                        {i < 1 ? <FaCheckCircle /> : i === 1 ? <FaClock /> : <Box w={2} h={2} rounded="full" bg={useColorModeValue("gray.300", "gray.600")} />}
                                                                                                    </Flex>
                                                                                                    <Text fontSize="xs" mt={2} fontWeight={i <= 1 ? "medium" : "normal"} color={i <= 1 ? "inherit" : "gray.500"}>{step}</Text>
                                                                                                </Flex>
                                                                                            ))}
                                                                                        </Flex>
                                                                                    </Box>

                                                                                    <Flex align="center" gap={3} p={3} bg={useColorModeValue("white", "gray.900")} rounded="md" borderWidth="1px" borderColor={borderColor}>
                                                                                        <FaTruck color="gray" />
                                                                                        <Box flex="1">
                                                                                            <Text fontSize="sm" fontWeight="medium">Truck delayed at Customs - New ETA +24h</Text>
                                                                                            <Text fontSize="xs" color="gray.500">The delivery truck has been delayed at the export checkpoint. Estimated arrival updated.</Text>
                                                                                        </Box>
                                                                                        <Button size="xs" variant="solid" colorScheme="gray" onClick={() => setTrackingOrder(order)}>Track</Button>
                                                                                    </Flex>
                                                                                </VStack>
                                                                            </Box>
                                                                        </Td>
                                                                    </Tr>
                                                                )}
                                                            </>
                                                        ))}
                                                        {filteredOrders.length === 0 && (
                                                            <Tr>
                                                                <Td colSpan={6} textAlign="center" color="gray.500" py="8">
                                                                    No orders found matching your criteria.
                                                                </Td>
                                                            </Tr>
                                                        )}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                        ) : (
                                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                                                {filteredOrders.map((order) => (
                                                    <Card
                                                        key={order.id}
                                                        variant="outline"
                                                        size="sm"
                                                        _hover={{ borderColor: "gray.400" }}
                                                        transition="all 0.2s"
                                                        cursor="pointer"
                                                        borderColor={expandedIds.has(order.id) ? "gray.400" : undefined}
                                                        bg={expandedIds.has(order.id) ? useColorModeValue("gray.50", "gray.800") : undefined}
                                                        onClick={() => toggleExpand(order.id)}
                                                    >
                                                        <CardBody>
                                                            <Flex justify="space-between" align="start" mb={2}>
                                                                <Box>
                                                                    <Flex align="center" gap={2}>
                                                                        <Text fontWeight="bold" fontSize="sm">{order.id}</Text>
                                                                        {expandedIds.has(order.id) ? <ChevronDownIcon color="gray.400" /> : <ChevronRightIcon color="gray.400" />}
                                                                    </Flex>
                                                                    <Text fontSize="xs" color="gray.500">{order.customer}</Text>
                                                                </Box>
                                                                <Box onClick={(e) => e.stopPropagation()}>
                                                                    <Menu isLazy>
                                                                        <MenuButton as={IconButton} aria-label="More" icon={<SettingsIcon />} size="xs" variant="ghost" rounded="full" />
                                                                        <MenuList>
                                                                            <MenuItem icon={<ViewIcon />} onClick={onNavigateToDetail}>
                                                                                View Details
                                                                            </MenuItem>
                                                                            <MenuItem icon={<EditIcon />}>
                                                                                Edit
                                                                            </MenuItem>
                                                                            <MenuItem icon={<DeleteIcon />}>
                                                                                Delete
                                                                            </MenuItem>
                                                                            <MenuItem icon={<EmailIcon />}>
                                                                                Contact
                                                                            </MenuItem>
                                                                        </MenuList>
                                                                    </Menu>
                                                                </Box>
                                                            </Flex>
                                                            <Divider mb={3} />
                                                            <VStack align="stretch" spacing={2}>
                                                                <Flex justify="space-between" fontSize="sm">
                                                                    <Text color="gray.500">Amount</Text>
                                                                    <Text fontWeight="medium">{order.amount}</Text>
                                                                </Flex>
                                                                <Flex justify="space-between" fontSize="sm">
                                                                    <Text color="gray.500">Due Date</Text>
                                                                    <Text>{order.date}</Text>
                                                                </Flex>
                                                                <Flex justify="space-between" align="center" pt={2}>
                                                                    <Tag size="sm" colorScheme={order.colorScheme}>{order.status}</Tag>
                                                                    <Avatar size="xs" name={order.avatar} />
                                                                </Flex>
                                                            </VStack>

                                                            {expandedIds.has(order.id) && (
                                                                <Box pt={4} mt={4} borderTop="1px" borderColor={borderColor} onClick={(e) => e.stopPropagation()} cursor="default">
                                                                    <VStack align="stretch" spacing={4}>
                                                                        <Flex align="center" gap={3}>
                                                                            <Avatar size="sm" icon={<FaUser />} bg="gray.200" color="gray.500" />
                                                                            <Box>
                                                                                <Text fontSize="sm" fontWeight="medium">Sarah Johnson</Text>
                                                                                <Text fontSize="xs" color="gray.500">Project Manager</Text>
                                                                            </Box>
                                                                        </Flex>

                                                                        <SimpleGrid columns={2} spacing={4}>
                                                                            <Box>
                                                                                <Text fontSize="xs" color="gray.500" mb={1}>LOCATION</Text>
                                                                                <Flex align="center" gap={1.5} fontSize="sm">
                                                                                    <FaMapMarkerAlt color="gray" />
                                                                                    NY, USA
                                                                                </Flex>
                                                                            </Box>
                                                                            <Box>
                                                                                <Text fontSize="xs" color="gray.500" mb={1}>PROJECT ID</Text>
                                                                                <Text fontSize="sm">PRJ-24-87</Text>
                                                                            </Box>
                                                                        </SimpleGrid>

                                                                        <Box bg={useColorModeValue("white", "gray.900")} p={3} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
                                                                            {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                                <Flex key={i} align="center" gap={2} mb={1}>
                                                                                    <Box w={2} h={2} rounded="full" bg={i <= 1 ? "gray.900" : "gray.300"} _dark={{ bg: i <= 1 ? "white" : "gray.600" }} />
                                                                                    <Text fontSize="xs" color={i <= 1 ? "inherit" : "gray.500"}>{step}</Text>
                                                                                </Flex>
                                                                            ))}
                                                                        </Box>

                                                                        <Flex align="center" gap={2} p={2} bg={useColorModeValue("gray.50", "gray.900")} rounded="md" borderWidth="1px" borderColor={borderColor}>
                                                                            <FaTruck color="gray" size="12px" style={{ marginTop: '0px' }} />
                                                                            <Box flex="1">
                                                                                <Text fontSize="xs" fontWeight="medium">Delay: Customs</Text>
                                                                                <Text fontSize="xs" color="gray.500">+24h ETA</Text>
                                                                            </Box>
                                                                            <Button size="xs" h="24px" fontSize="10px" variant="solid" colorScheme="gray" onClick={() => setTrackingOrder(order)}>Track</Button>
                                                                        </Flex>
                                                                    </VStack>
                                                                </Box>
                                                            )}
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                                {filteredOrders.length === 0 && (
                                                    <Box gridColumn="1/-1" textAlign="center" color="gray.500" py="8">
                                                        No orders found matching your criteria.
                                                    </Box>
                                                )}
                                            </SimpleGrid>
                                        )}
                                    </CardBody>
                                </Card>
                            </Box>

                            {/* Metrics */}
                            <Box gridColumn={{ lg: 'span 3' }}>
                                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="4">
                                    <Card boxShadow="sm">
                                        <CardBody display="flex" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Total Revenue</Text>
                                                <Text fontSize="xl" fontWeight="bold">$2,847,500</Text>
                                            </Box>
                                            <ArrowForwardIcon transform="rotate(-45deg)" color="gray.400" />
                                        </CardBody>
                                    </Card>
                                    <Card boxShadow="sm">
                                        <CardBody display="flex" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Operational Costs</Text>
                                                <Text fontSize="xl" fontWeight="bold">$1,625,000</Text>
                                            </Box>
                                            <ArrowForwardIcon transform="rotate(-45deg)" color="gray.400" />
                                        </CardBody>
                                    </Card>
                                    <Card boxShadow="sm">
                                        <CardBody display="flex" justifyContent="space-between" alignItems="center">
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Net Profit</Text>
                                                <Text fontSize="xl" fontWeight="bold">$1,222,500</Text>
                                            </Box>
                                            <FaBox color="gray" />
                                        </CardBody>
                                    </Card>
                                </Grid>
                            </Box>

                            {/* Charts */}
                            <Box gridColumn={{ lg: 'span 2' }}>
                                <Card boxShadow="sm" h="full">
                                    <CardHeader>
                                        <Heading size="md">Inventory Turnover by Category</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box h="300px" w="100%">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={inventoryData}>
                                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: bgCard, borderColor: borderColor, color: textColorMain }} />
                                                    <Bar dataKey="value" fill={chartFill} radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>

                            <Box gridColumn={{ lg: 'span 1' }}>
                                <Card boxShadow="sm" h="full">
                                    <CardHeader>
                                        <Heading size="md">Sales vs. Costs</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Box h="300px" w="100%">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={salesData}>
                                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                                    <Tooltip cursor={{ stroke: 'gray.500' }} contentStyle={{ backgroundColor: bgCard, borderColor: borderColor, color: textColorMain }} />
                                                    <Line type="monotone" dataKey="sales" stroke={chartStroke} strokeWidth={2} dot={false} />
                                                    <Line type="monotone" dataKey="costs" stroke="#A0AEC0" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>

                        </Grid>
                    </VStack>
                </Box>
            </Flex>

            <Modal isOpen={!!trackingOrder} onClose={() => setTrackingOrder(null)} size="2xl" isCentered>
                <ModalOverlay backdropFilter="blur(4px)" />
                <ModalContent>
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
                        <Text>Tracking Details - {trackingOrder?.id}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                            {/* Left Col: Timeline */}
                            <Box>
                                <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="gray.500" mb={4} textTransform="uppercase">Shipment Progress</Text>
                                <Box pl={2} borderLeftWidth="1px" borderColor={useColorModeValue("gray.200", "gray.700")} ml={2} position="relative">
                                    <VStack align="stretch" spacing={6}>
                                        {trackingSteps.map((step, idx) => (
                                            <Box key={idx} position="relative" pl={6}>
                                                <Box
                                                    position="absolute"
                                                    left="-5px"
                                                    top="1px"
                                                    w="9px"
                                                    h="9px"
                                                    rounded="full"
                                                    bg={step.completed ? (colorMode === 'light' ? 'gray.900' : 'white') : (colorMode === 'light' ? 'gray.300' : 'gray.600')}
                                                    borderWidth="4px"
                                                    borderColor={colorMode === 'light' ? 'white' : 'gray.800'}
                                                    boxSizing="content-box"
                                                    sx={{
                                                        backgroundColor: step.alert ? 'red.500 !important' : undefined
                                                    }}
                                                />
                                                <Text fontSize="sm" fontWeight="medium">{step.status}</Text>
                                                <Text fontSize="xs" color="gray.500">{step.date} · {step.location}</Text>
                                            </Box>
                                        ))}
                                    </VStack>
                                </Box>
                            </Box>

                            {/* Right Col: Georeference & Actions */}
                            <Flex direction="column" height="100%">
                                <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="gray.500" mb={4} textTransform="uppercase">Delivery Location</Text>

                                {/* Map Placeholder */}
                                <Flex
                                    bg={useColorModeValue("gray.100", "gray.700")}
                                    rounded="md"
                                    h="160px"
                                    w="full"
                                    mb={4}
                                    align="center"
                                    justify="center"
                                    borderWidth="1px"
                                    borderColor={useColorModeValue("gray.200", "gray.700")}
                                >
                                    <Box textAlign="center">
                                        <FaMapMarkerAlt size="24px" color="gray" style={{ margin: '0 auto 8px' }} />
                                        <Text fontSize="xs" color="gray.500">Map Preview Unavailable</Text>
                                    </Box>
                                </Flex>

                                <Box bg={useColorModeValue("gray.50", "gray.800")} p={3} rounded="md" borderWidth="1px" borderColor={useColorModeValue("gray.200", "gray.700")} mb={6}>
                                    <Text fontSize="xs" fontWeight="medium">Distribution Center NY-05</Text>
                                    <Text fontSize="xs" color="gray.500" mt={1}>45 Industrial Park Dr, Brooklyn, NY 11201</Text>
                                </Box>

                                <Box mt="auto" pt={4} borderTopWidth="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
                                    <Button width="full" colorScheme="gray" variant="solid" leftIcon={<EmailIcon />} onClick={() => console.log('Contact')}>
                                        Contact Support
                                    </Button>
                                </Box>
                            </Flex>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
