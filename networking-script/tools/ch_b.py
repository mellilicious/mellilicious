from lib import *
from ch_a import row

# ---------------------------------------------------------------- 10
def ch10():
    s1 = sec(1, 'What is DNS?', '<p>DNS is the Internet’s phonebook. It translates human-readable domain names into IP addresses that computers use to communicate.</p>' + fig('dns_type'))
    s2 = sec(2, 'DNS Resolution Flow', fig('dns_flow'))
    ic = lambda n: f'<span style="display:inline-block;width:10mm;vertical-align:middle">{icon(n)}</span>'
    t = table(['Record Type', 'Purpose', 'Example', 'Explanation'], [
        [ic('dns_a') + '<br>A Record <small>(Address)</small>', 'Maps a domain name to an IPv4 address.', '<span class="r">qa-insights.com → 93.184.216.34</span>', 'Points the domain to an IPv4 address.'],
        [ic('dns_cname') + '<br>CNAME Record <small>(Canonical Name)</small>', 'Maps one domain name to another domain name.', '<span class="r">www.qa-insights.com → qa-insights.com</span>', 'Alias of another domain. No IP address.'],
        [ic('dns_mx') + '<br>MX Record <small>(Mail Exchange)</small>', 'Specifies mail server for the domain.', '<span class="r">qa-insights.com → mail.qa-insights.com (Priority 10)</span>', 'Tells where to deliver email for the domain.'],
        [ic('dns_txt') + '<br>TXT Record <small>(Text)</small>', 'Stores text information about the domain.', '<span class="r">qa-insights.com → “v=spf1 include:_spf.qa-insights.com ~all”</span>', 'Used for SPF, ownership verification, policies, etc.'],
    ])
    s3 = sec(3, 'Important DNS Record Types', t, 'wide')
    why = box('rem', 'Why DNS is Critical in DevOps?', ul(['Maps domains to load balancers / services', 'Enables blue-green / canary deployments', 'Works with CDNs, monitoring, email, etc.'], 'ck'), '💡')
    s4 = sec(4, 'DevOps Example', '<p style="text-align:center">QA Insights Application is hosted on AWS.</p>' + fig('dns_devops') + why)
    q = table(['Type', 'Use Case'], [['A', 'Domain → IPv4 address'], ['AAAA', 'Domain → IPv6 address'], ['CNAME', 'Domain alias (one name to another)'], ['MX', 'Mail server configuration'],
                                       ['TXT', 'SPF, DKIM, verification, policies'], ['NS', 'Authoritative name servers'], ['PTR', 'Reverse DNS lookup (IP → Domain)']], 'soft')
    s5 = sec(5, 'Quick Reference <small>(Common DNS Record Summary)</small>', q + tip('Always understand how DNS works, record types, and how caching affects resolution time.'))
    return chapter(10, 'DNS <small style="font-size:70%">(Domain Name System)</small>', grid('g2', s1, s2) + s3 + grid('g2', s4, s5))

# ---------------------------------------------------------------- 11
def ch11():
    s1 = sec(1, 'Request Lifecycle', fig('http_life') + '', 'wide')
    m = table(['Method', 'Purpose', 'Idempotent', 'Safe'], [
        ['GET', 'Retrieve data', OK, OK], ['POST', 'Create new resource', NO, NO], ['PUT', 'Update entire resource', OK, NO], ['PATCH', 'Update partial resource', NO, NO],
        ['DELETE', 'Delete resource', OK, NO], ['HEAD', 'Get headers only', OK, OK], ['OPTIONS', 'Get supported methods', OK, OK]], 'soft')
    s2 = sec(2, 'HTTP Methods', m)
    sc = table(['', '', ''], [
        ['1xx', 'Informational', 'Request received, continuing process'], ['2xx', 'Success', '200 OK, 201 Created, 204 No Content'], ['3xx', 'Redirection', '301 Moved Permanently, 302 Found'],
        ['4xx', 'Client Error', '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests'],
        ['5xx', 'Server Error', '500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout']], 'soft').replace('<tr><th></th><th></th><th></th></tr>', '')
    sc = sc.replace('<td class="name">', '<td class="name" style="font-size:12pt">').replace('<td>Informational', '<td class="g">Informational')
    s3 = sec(3, 'HTTP Status Codes <small>(Most Important)</small>', sc)
    s4 = sec(4, 'SSL/TLS <small>(How HTTPS Works)</small>', fig('http_tls'))
    rest = box('', 'Example', '<pre>GET    /api/users      → Get all users\nPOST   /api/users      → Create user\nGET    /api/users/123  → Get user by ID\nPUT    /api/users/123  → Update user\nDELETE /api/users/123  → Delete user</pre>', ' ')
    s5 = sec(5, 'REST APIs', ul(['REST (Representational State Transfer) is an architectural style for APIs.', 'Uses HTTP methods to perform operations on resources.',
                                'Resources are identified using URLs.', 'Common data format: <b>JSON / XML</b>.']) + rest)
    s6 = sec(6, 'HTTPS Benefits', row('<div style="width:100%">' + fig('http_bar') + fig('http_shield') + '</div>', ul([
        'Encrypts data → prevents eavesdropping.', 'Authenticates server → prevents man-in-the-middle attacks.', 'Ensures data integrity → data cannot be tampered.',
        'Improves user trust (padlock icon in browser).', 'Required for modern web apps, APIs, payments, logins.'], 'ck'), 'w34'))
    q = table(['', ''], [['Protocol', 'HTTP (80) / HTTPS (443)'], ['Purpose', 'Web communication'], ['Data', 'HTTP → Plain Text<br>HTTPS → Encrypted (TLS)'],
                         ['Security', 'HTTP → No Security<br>HTTPS → Secure'], ['Best Practice', 'Always use HTTPS in production']], 'soft').replace('<tr><th></th><th></th></tr>', '')
    s7 = sec(7, 'Quick Reference', q)
    return chapter(11, 'HTTP &amp; HTTPS', s1 + grid('g2', s2, s3) + grid('g2', s4, s5) + grid('g2', s6, s7) +
                   tip('Explain the request lifecycle, difference between HTTP &amp; HTTPS, and when to use each HTTP method.'))

# ---------------------------------------------------------------- 12
def ch12():
    s1 = sec(1, 'Router <small>(What it does)</small>', ul(['A router connects multiple networks and forwards packets based on IP addresses.', 'It uses a routing table to decide the best path.']) + fig('rt_router', '92%'))
    rt = table(['Destination Network', 'Next Hop'], [['192.168.1.0/24', '<span class="g">Directly Connected</span>'], ['10.0.0.0/24', '<span class="r">10.0.0.1</span>'], ['0.0.0.0/0', '<span class="r">203.0.113.1</span>']], 'soft', first_name=False)
    s2 = sec(2, 'Routing <small>(How packets find the path)</small>', '<h3>Routing Table <small>(Example)</small></h3>' + rt +
             keyp('<span class="r">0.0.0.0/0</span> is the <b>Default Route</b>. Used for all unknown destinations (Internet).'))
    s3 = sec(3, 'Default Gateway', ul(['A default gateway is the router’s IP address in your local network.', 'If the destination IP is outside the local subnet, traffic is sent to the default gateway.']) + fig('rt_gw'))
    s4 = sec(4, 'NAT <small>(Network Address Translation)</small>', ul(['NAT allows multiple private IPs to share one public IP address.', 'Hides internal network from the internet.']) + fig('rt_nat') +
             rem('<p><b>Types:</b> <span class="r">SNAT</span> (Source NAT) → for outgoing traffic</p><p style="margin-left:11mm"><span class="r">DNAT</span> (Destination NAT / Port Forwarding) → for incoming traffic</p>', ' '))
    s5 = sec(5, 'Packet Journey <small>(Inside → Internet)</small>', fig('rt_journey') +
             rem('<b>Return Path:</b> Server → Internet → NAT (203.0.113.5) → 192.168.1.10 (Original Client)', ' '))
    s6 = sec(6, 'Real-World Example', '<p>QA Insights Application is hosted inside AWS VPC and accessed by users over the Internet.</p>' + fig('rt_real'))
    tp = tip(ul(['Router decides the path (Routing).', 'Default Gateway is your exit door to other networks.', 'NAT hides private IPs and enables internet access.', 'Understand packet flow end-to-end.'], 'ck'))
    rm = rem(ul(['Private IPs: <span class="r">10.x.x.x, 172.16–31.x.x, 192.168.x.x</span>', 'Default Gateway = Router IP in your subnet', 'NAT ≠ Routing (NAT translates, Router routes)'], 'ck'))
    cm = cmds(['Show Route Table      : ip route  (Linux)', 'Check Default Gateway  : ip route | grep default', 'Test Connectivity      : ping 8.8.8.8', 'Trace Route            : traceroute qa-insights.com'])
    return chapter(12, 'Routing, NAT &amp; Gateway', grid('g2', col(s1, s3), col(s2, s4)) + grid('g2', s5, s6) + grid('g2', col(tp, rm), cm))

def rem_wrap(x): return x

# ---------------------------------------------------------------- 13
def ch13():
    s1 = sec(1, 'What is a Firewall?', '<p>A firewall monitors and controls incoming and outgoing network traffic based on security rules.</p>' + fig('fw_basic') +
             rem('Firewalls act as a barrier between trusted internal networks and untrusted external networks.', ' '))
    st = table(['Stateless Firewall', 'Stateful Firewall'], [
        ['Examines each packet independently.', 'Tracks the state of active connections.'], ['Works at L3/L4 (IP, Port, Protocol).', 'Works at L3/L4 and keeps connection state table.'],
        ['Faster but less secure.', 'Slightly slower but more secure.'], ['Allows/blocks based only on rules.', 'Allows return traffic automatically for valid connections.'],
        ['Example: Basic ACLs, NACLs.', 'Example: Most modern firewalls, AWS Security Groups.']], 'soft', first_name=False).replace('<th>Stateless', '<th class="r">Stateless').replace('<th>Stateful', '<th class="r">Stateful')
    s2 = sec(2, 'Stateful vs Stateless Firewall', st)
    sgt = table(['Type', 'Protocol', 'Port', 'Source'], [['SSH', 'TCP', '22', '203.0.113.10/32'], ['HTTP', 'TCP', '80', '0.0.0.0/0'], ['HTTPS', 'TCP', '443', '0.0.0.0/0']], 'soft', first_name=False)
    s3 = sec(3, 'Security Groups <small>(Stateful)</small>', ul(['Virtual firewall for instances.', 'Stateful: Return traffic is automatically allowed.', 'Rules are allow only.', 'Operates at instance level.',
             'Example: AWS Security Group, Azure NSG (stateful).']) + box('rem', 'Example (Allow Rules)', sgt + '<p class="g" style="margin:0">✓ Only defined traffic is allowed. Everything else is denied.</p>', ' '))
    nt = table(['Rule #', 'Type', 'Protocol', 'Port', 'Source', 'Action'], [
        ['100', 'HTTP', 'TCP', '80', '0.0.0.0/0', '<span class="g">ALLOW</span>'], ['110', 'SSH', 'TCP', '22', '203.0.113.10/32', '<span class="g">ALLOW</span>'], ['120', 'ALL', 'ALL', 'ALL', '0.0.0.0/0', '<span class="r">DENY</span>']], 'soft', first_name=False)
    s4 = sec(4, 'Network ACL (NACL) <small>(Stateless)</small>', ul(['Operates at subnet level (not instance).', 'Stateless: You must allow both inbound and outbound.', 'Rules are allow and deny.',
             'Evaluated in order (lowest rule number first).', 'Example: AWS NACL, Azure NSG (stateless mode).']) + box('rem', 'Example (Inbound Rules)', nt + '<p class="g" style="margin:0">✓ If a packet doesn’t match any ALLOW rule, it’s DENIED.</p>', ' '))
    s5 = sec(5, 'VPN <small>(Virtual Private Network)</small>', ul(['Creates an encrypted tunnel over the internet.', 'Used for secure remote access or site-to-site connectivity.', 'Types: Site-to-Site VPN, Client-to-Site VPN.',
             'Protocols: IPsec, OpenVPN, SSL/TLS.']) + fig('fw_vpn'))
    s6 = sec(6, 'Bastion Host <small>(Jump Server)</small>', ul(['A secure gateway host to access private servers.', 'Direct access to private instances is blocked.', 'Admins SSH/RDP to Bastion first, then to internal servers.',
             'Best practice: Enable MFA, logging, least privilege access.']) + fig('fw_bastion'))
    kp = box('tip', 'Key Points', ul(['Use least privilege – allow only required traffic.', 'Prefer stateful firewalls (SG) for simplicity.', 'NACLs are for subnet-level control &amp; extra layer.',
                                       'Always encrypt traffic using VPN/TLS.', 'Use Bastion Host – never expose private servers.'], 'ck'), '⭐')
    tp = rem(ul(['Stateful firewall remembers connections, stateless does not.', 'Security Groups = stateful, NACL = stateless.',
                 'Default behavior: SG = Deny all inbound, Allow all outbound. NACL = Allow all for both (you must change range).', 'VPN and Bastion Host improve security posture in cloud.']), 'Interview Tip')
    return chapter(13, 'Firewalls &amp; Network Security', grid('g2', col(s1, s3, s5), col(s2, s4, s6)) + grid('g2', kp, tp))

# ---------------------------------------------------------------- 14
def ch14():
    s1 = sec(1, 'Why Load Balancer?', ul(['Distributes incoming traffic across multiple servers.', 'Improves availability, scalability and performance.', 'Prevents single point of failure.',
             'Performs health checks and routes only to healthy servers.']) + fig('lb_why', '90%') +
             keyp('Load balancer hides backend servers, provides high availability and seamless scaling.'))
    lt = table(['Feature', 'L4 (Transport Layer)', 'L7 (Application Layer)'], [
        ['Layer', '<span class="r">OSI Layer 4 (TCP/UDP)</span>', '<span class="r">OSI Layer 7 (HTTP/HTTPS)</span>'], ['Basis', 'IP, Port, Protocol', 'Content (URL, Host, Header)'],
        ['Speed', 'Very Fast', 'Slightly Slower'], ['Example Use', 'Databases, TCP apps, Microservices', 'Web apps, APIs, SSL offloading, Content routing'],
        ['Example Tools', '<span class="r">AWS NLB, HAProxy (TCP)</span>', '<span class="r">AWS ALB, Nginx, Envoy</span>']], 'soft')
    s2 = sec(2, 'L4 vs L7 Load Balancing', lt)
    s3 = sec(3, 'Forward Proxy <small>(Client-side Proxy)</small>', fig('lb_fwd') + ul(['Acts on behalf of clients to access the internet.', 'Hides internal IPs from external websites.', 'Used for caching, filtering, access control.']))
    s4 = sec(4, 'Reverse Proxy <small>(Server-side Proxy)</small>', fig('lb_rev') + ul(['Sits in front of backend servers.', 'Receives client requests, forwards to appropriate server.',
             'Provides SSL termination, caching, compression, security.', 'Hides backend servers from clients.']))
    s5 = sec(5, 'Nginx <small>(Popular Reverse Proxy / Load Balancer)</small>', row(icon('lb_nginx'), ul([
        'High performance, lightweight and open-source.', 'Works as Web Server, Reverse Proxy, Load Balancer, API Gateway.', 'Supports L4 &amp; L7 load balancing.', 'SSL termination, caching, compression.',
        'Widely used in DevOps, Microservices, Kubernetes Ingress Controllers.'], 'ck'), 'w16'))
    s6 = sec(6, 'High Availability (HA) Concepts', grid('g2', ul(['Multiple load balancers (Active-Active)', 'Health checks remove unhealthy nodes.', 'Auto scaling adds/removes servers.',
             'Use DNS or Anycast IP for LB redundancy.', 'Backups, monitoring and alerts are must.']), fig('lb_ha', '78%')))
    rm = rem(ul(['HA = No Single Point of Failure', 'Use multiple components at every layer (LB, App, DB, Network).', 'Design for failure, not just for performance.'], 'ck'))
    tp = tip('Know the difference between L4 &amp; L7. Understand when to use Proxy vs Load Balancer. Be ready with examples: Nginx, HAProxy, AWS ALB/NLB.')
    ct = box('', 'Common Tools', '<p><span class="g">Load Balancers:</span> Nginx, HAProxy, AWS ALB/NLB, GCP Cloud Load Balancer, Azure Load Balancer</p><p><span class="r">Reverse Proxy:</span> Nginx, Traefik, Envoy</p><p><span class="r">Forward Proxy:</span> Squid, Nginx</p>', '🔧')
    return chapter(14, 'Load Balancer &amp; Proxy', grid('g2', col(s1, s4), col(s2, s3, s5)) + s6 + grid('g3', rm, tp, ct))

# ---------------------------------------------------------------- 15
def ch15():
    s1 = sec(1, 'Docker Network Overview', ul(['Docker provides multiple network drivers to enable containers to communicate securely and efficiently.', 'Use <code>docker network ls</code> to list networks.']) + fig('dk_over'))
    s2 = sec(2, 'Bridge Network <small>(Default)</small>', ul(['Default network mode.', 'Containers connect via a virtual bridge (docker0) on the host.', 'Containers can talk to each other and access external networks through NAT.']) + fig('dk_bridge', '75%'))
    s3 = sec(3, 'Host Network', ul(['Container shares the host’s network namespace.', 'No isolation – container gets host’s IP.', 'High performance, low latency.']) + fig('dk_host') +
             rem('High performance apps, monitoring, network tools.', 'Use Case:'))
    s4 = sec(4, 'None Network', ul(['Container has no networking.', 'No IP address, no routing.', 'Complete isolation.']) + fig('dk_none'))
    s5 = sec(5, 'Overlay Network', ul(['Used for multi-host container communication.', 'Creates a virtual network across Docker hosts.', 'Uses VXLAN under the hood.']) + fig('dk_overlay') +
             rem('Swarm mode, Kubernetes, multi-host microservices.', 'Use Case:'))
    s6 = sec(6, 'Port Mapping <small>(Publish Ports)</small>', ul(['Exposes container ports to the host and external world.', 'Format: <code>-p &lt;host_port&gt;:&lt;container_port&gt;</code>']) + fig('dk_port') +
             box('rem', 'Example:', '<pre>docker run -d -p 8080:80 nginx</pre><p style="margin:0">Access Nginx on <span class="r">http://10.0.0.10:8080</span></p>', '💡'))
    s7 = sec(7, 'Docker DNS <small>(Embedded DNS)</small>', ul(['Docker provides an internal DNS server (<span class="r">127.0.0.11</span>) for container name resolution.', 'Containers can resolve other containers by name.']) + fig('dk_dns') +
             box('rem', 'Example:', '<p style="margin:0">Container A calls <span class="r">http://qa-api:8080</span><br>✓ DNS resolves “qa-api” to 172.17.0.3</p>', '💡'))
    kp = box('tip', 'Key Points', ul(['<b>Bridge</b> = Default network (isolated but connected)', '<b>Host</b> = Best performance', '<b>None</b> = No network access', '<b>Overlay</b> = Multi-host communication',
                                       '<b>Port Mapping</b> = Expose services', '<b>Docker DNS</b> = Service discovery by name'], 'ck'), '⭐')
    tp = tip('Understand when to use each network mode. Know port mapping, container name resolution, and overlay for multi-host setups.')
    cm = cmds(['docker network ls', 'docker network inspect &lt;network&gt;', 'docker run -d --network &lt;network_name&gt; nginx', 'docker run -d -p 8080:80 nginx'])
    rm = rem(ul(['Containers on same network communicate by IP or Name.', 'Port mapping exposes container ports.', 'Overlay enables containers on different hosts to talk.'], 'ck'))
    return chapter(15, 'Docker Networking', grid('g3', s1, s2, s3) + grid('g2', s4, s5) + grid('g2', s6, col(s7, kp)) + grid('g3', tp, cm, rm))

# ---------------------------------------------------------------- 16
def ch16():
    s1 = sec(1, 'Pod Network', ul(['Each Pod gets its own IP address.', 'Pods can communicate with each other across nodes without NAT.', 'Implemented using CNI plugins (Flannel, Calico, Cilium, Weave).']) +
             fig('k8_pod') + keyp('Every Pod IP is reachable from every other Pod in the cluster.'))
    s2 = sec(2, 'Service <small>(Overview)</small>', ul(['Service provides a stable endpoint (IP + DNS) to a set of Pods.', 'Decouples clients from Pod lifecycle.',
             'Kubernetes Service Types: <span class="r">ClusterIP | NodePort | LoadBalancer | Ingress</span>']) + fig('k8_svc'))
    s3 = sec(3, 'ClusterIP <small>(Default)</small>', ul(['Exposes the Service on a cluster-internal IP.', 'Accessible only inside the cluster.', 'Used for internal communication.']) + fig('k8_cip'))
    s4 = sec(4, 'NodePort', ul(['Exposes the Service on each Node’s IP at a static port (30000–32767).', 'Accessible from outside via <b>&lt;NodeIP&gt;:&lt;NodePort&gt;</b>.']) + fig('k8_np') +
             '<p class="g" style="text-align:center;margin:0">Traffic goes to Node and then to Pods.</p>')
    s5 = sec(5, 'LoadBalancer', ul(['Creates an external Load Balancer in cloud (AWS ELB, Azure LB, GCP LB).', 'Provides a dedicated external IP.']) + fig('k8_lb') +
             '<p class="g" style="text-align:center;margin:0">Best for production applications.</p>')
    s6 = sec(6, 'Ingress', ul(['HTTP/HTTPS routing to Services based on rules.', 'Operates at Layer 7 (Application Layer).', 'Requires Ingress Controller (e.g., Nginx Ingress).']) + fig('k8_ing'))
    t = table(['Type', 'Exposure', 'Access', 'Use Case'], [
        ['ClusterIP', 'Cluster Internal IP', 'Inside Cluster', 'Internal services'], ['NodePort', 'Node IP + Port', 'Inside &amp; Outside', 'Dev / Testing'],
        ['LoadBalancer', 'Cloud LB (External IP)', 'Outside', 'Production Apps'], ['Ingress', 'HTTP/HTTPS (L7)', 'Outside (via rules)', 'Web Apps / APIs']], 'soft')
    s7 = sec(7, 'Service Types Summary', t)
    tp = tip(ul(['ClusterIP is default and not accessible from outside.', 'NodePort exposes on all nodes – be careful with security.', 'LoadBalancer is cloud dependent.', 'Ingress = smarter routing (L7).', 'Pods communicate directly using Pod IPs.'], 'ck'))
    rm = rem(ul(['Service = Stable endpoint', 'Ingress = Smart traffic routing', 'Use right Service type based on requirement'], 'ck'))
    dn = box('rem', 'DevOps Note', '<p style="margin:0">Use Network Policies to control Pod-to-Pod traffic for security.<br>Example: Allow only QA Insights API Pods to access QA Insights DB Pods.</p>', '💡')
    cm = cmds(['kubectl get pods -o wide', 'kubectl get svc', 'kubectl get ingress', 'kubectl describe svc &lt;service-name&gt;', 'kubectl describe ingress &lt;ingress-name&gt;'])
    return chapter(16, 'Kubernetes Networking', grid('g12', s1, s2) + grid('g3', s3, s4, s5) + grid('g2', s6, col(s7, rm)) + grid('g2', col(tp, dn), cm))

# ---------------------------------------------------------------- 17
def ch17():
    s1 = sec(1, 'What is VPC?', ul(['A Virtual Private Cloud is a logically isolated network in the cloud.', 'You control IP ranges, subnets, route tables, gateways and security.',
             'Provides secure, scalable and flexible networking for QA Insights workloads.']) + keyp('VPC is your own private network in the AWS Cloud.'))
    tf = box('rem', 'Traffic Flow', ul(['Internet → IGW', 'IGW → Public Subnet', 'Private Subnet → NAT Gateway → IGW → Internet'], 'nm'), '🔀')
    s2 = sec(2, 'VPC Architecture Overview', fig('vpc_arch', '88%') + tf)
    pub = '<div class="box rem" style="border-style:solid"><div class="t"><u class="g">Public Subnet</u></div>' + ul(['Route to Internet via IGW.', 'Resources have Public IP.', 'Used for bastion, ALB, web servers.'], 'ck') + '</div>'
    prv = '<div class="box" style="border-style:solid;border-color:#2f4fa0"><div class="t"><u style="color:#2f4fa0">Private Subnet</u></div>' + ul(['No direct route to Internet.', 'Resources have Private IP.', 'Used for app servers, databases, caching.'], 'ck') + '</div>'
    s3 = sec(3, 'Public vs Private Subnets', pub + prv)
    s4 = sec(4, 'Internet Gateway (IGW)', ul(['Horizontally scaled, redundant, and highly available.', 'Enables communication between VPC and the Internet.', 'Attached to the VPC only.']) +
             '<p>Example: Internet ↔ <span class="r">IGW</span> ↔ Public Subnet</p>')
    s5 = sec(5, 'NAT Gateway', ul(['Allows instances in private subnet to access the Internet.', 'Blocks inbound connections from Internet.', 'Used for updates, downloads, package repositories.']) +
             '<p>Example: Private Subnet → <span class="r">NAT</span> → <span class="r">IGW</span> → Internet</p>')
    rt = table(['Destination', 'Target'], [['<span class="r">10.0.0.0/16</span>', 'local'], ['0.0.0.0/0', 'igw-xxxxxxxx <small>(for Public)</small>'], ['0.0.0.0/0', 'nat-xxxxxxxx <small>(for Private)</small>']], 'soft', first_name=False)
    s6 = sec(6, 'Route Tables', ul(['Defines where network traffic is going.', 'Associated with subnets.', 'Longest prefix match is used.', 'Main Route (local): <span class="r">10.0.0.0/16 → local</span>']) + rt)
    s7 = sec(7, 'Security Groups <small>(Stateful Firewall)</small>', ul(['Operates at instance level.', 'Stateful: return traffic is auto-allowed.', 'Allow rules only (implicit deny all).', 'Used for fine-grained control.']) + fig('vpc_sg'))
    s8 = sec(8, 'Best Practices', ul(['Keep private resources in Private Subnets.', 'Use NAT Gateway for outbound internet access.', 'Use Security Groups for instance-level control.',
             'Use separate route tables for different subnets.', 'Enable Flow Logs for monitoring traffic.', 'Use least privilege access.'], 'ck'))
    tp = tip(ul(['IGW = Internet in', 'NAT Gateway = Outbound only for Private', 'Route Table decides the path', 'Security Group = Stateful, at instance level', 'NACL = Stateless, at subnet level',
                 'Public Subnet has route to IGW', 'Private Subnet has route to NAT Gateway'], 'ck'))
    uc = box('rem', 'Common Use Cases', ul(['Host public web apps in public subnet.', 'Place application &amp; database in private subnets.', 'Allow private instances to download updates via NAT.',
                                              'Isolate environments (Dev, QA, Prod) in separate VPCs.'], 'ck'), '💡')
    cm = cmds(['aws ec2 describe-vpcs            # List VPCs', 'aws ec2 describe-subnets          # List Subnets', 'aws ec2 describe-route-tables     # List Route Tables',
               'aws ec2 describe-security-groups  # List Security Groups', 'aws ec2 describe-nat-gateways     # List NAT Gateways'], 'Useful Commands (AWS CLI)')
    rm = rem(ul(['VPC = Your private network', 'IGW = Internet access', 'NAT = Outbound internet', 'Route Table = Traffic path', 'SG = Stateful firewall'], 'ck'))
    return chapter(17, 'Cloud Networking <small style="font-size:70%">(AWS VPC)</small>',
                   grid('g12', col(s1, s3), s2) + grid('g3', s4, s5, s6) + grid('g2', s7, s8) + grid('g2', tp, col(uc, rm)) + cm)

# ---------------------------------------------------------------- 18
def ch18():
    a = table(['OSI Model (7 Layers)', 'TCP/IP Model (4 Layers)', 'Function'], [
        ['7. Application<br>6. Presentation<br>5. Session', '<span class="r">Application</span>', 'Network services to applications'], ['4. Transport', '<span class="r">Transport</span>', 'End-to-end communication'],
        ['3. Network', '<span class="r">Internet</span>', 'Logical addressing &amp; routing'], ['2. Data Link<br>1. Physical', '<span class="r">Network Access</span>', 'Framing, MAC addressing<br>Bit transmission over media']], 'soft', first_name=False)
    b = table(['Feature', 'TCP', 'UDP'], [
        ['Connection', 'Connection-oriented (3-way handshake)', 'Connectionless'], ['Reliability', 'Reliable, guaranteed delivery', 'Best-effort, no guarantee'], ['Order', 'Maintains order of packets', 'No order guarantee'],
        ['Speed', 'Slower (overhead for reliability)', 'Faster (low overhead)'], ['Data Type', 'Stream of bytes', 'Datagrams (packets)'], ['Use Cases', 'Web, Email, File transfer, SSH', 'DNS, VoIP, Gaming, Streaming'],
        ['Example Ports', '80, 443, 22, 3306', '53, 123, 161, 500']], 'soft').replace('<th>TCP', '<th class="r">TCP').replace('<th>UDP', '<th class="r">UDP')
    c = table(['Feature', 'HTTP', 'HTTPS'], [
        ['Full Form', 'HyperText Transfer Protocol', 'HyperText Transfer Protocol Secure'], ['Port', '80', '443'], ['Security', 'Not Encrypted', 'Encrypted (SSL/TLS)'], ['Data', 'Plain Text', 'Encrypted'],
        ['Authentication', 'No', 'Yes (Certificate)'], ['SEO / Trust', 'Lower', 'Higher (Secure)'], ['Use', 'General web traffic', 'Sensitive data, APIs, Logins']], 'soft').replace('<th>HTTP<', '<th class="r">HTTP<').replace('<th>HTTPS', '<th class="r">HTTPS')
    s1 = sec(1, 'Key Comparisons', grid('g3', f'<div><h3 class="gr">A. OSI vs TCP/IP</h3>{a}</div>', f'<div><h3 class="gr">B. TCP vs UDP</h3>{b}</div>', f'<div><h3 class="gr">C. HTTP vs HTTPS</h3>{c}</div>') +
             rem('Use HTTPS everywhere. It encrypts data and builds trust.', 'Tip:'), 'wide')
    cmdrow = lambda c, p, ex, w: [f'<span class="r" style="font:400 13pt Patrick Hand">{c}</span>', p, f'<code style="background:none;font-weight:600">{ex}</code>', w]
    ct = table(['Command', 'Purpose', 'Example', 'What it shows'], [
        cmdrow('ping', 'Test reachability and latency.', 'ping qa-insights.com<br><span style="font-weight:400;color:var(--ink)">[Windows: ping qa-insights.com]</span>', 'Whether host is reachable, response time (latency) and packet loss.'),
        cmdrow('traceroute', 'Trace the path packets take to reach destination.', 'traceroute qa-insights.com<br><span style="font-weight:400;color:var(--ink)">[Windows: tracert qa-insights.com]</span>', 'All network hops (routers) and latency at each hop.'),
        cmdrow('nslookup', 'Query DNS to get domain information.', 'nslookup qa-insights.com', 'IP address, Name servers and DNS records.'),
        cmdrow('dig', 'Advanced DNS lookup (tool for admins).', 'dig qa-insights.com<br>dig @8.8.8.8 qa-insights.com A', 'Detailed DNS records, TTL, response codes, etc.'),
        cmdrow('curl', 'Transfer data to/from server (HTTP/HTTPS).', 'curl -I https://qa-insights.com/api<br>curl -X GET https://qa-insights.com/api', 'HTTP headers, response code and response data.'),
        cmdrow('ip', 'Show / configure network interfaces and routes.', 'ip a<br>ip route', 'IP addresses, interfaces, routing table.'),
        cmdrow('ss', 'Show socket statistics (TCP/UDP connections).', 'ss -tuln<br>ss -tp', 'Listening ports, open connections, process info.')], 'soft')
    s2 = sec(2, 'Common Commands', ct, 'wide')
    ports = table(['Port', 'Service', 'Port', 'Service'], [
        ['22', 'SSH (Secure Shell)', '5432', 'PostgreSQL'], ['53', 'DNS (Domain Name System)', '27017', 'MongoDB'], ['80', 'HTTP (Web)', '6379', 'Redis'],
        ['443', 'HTTPS (Secure Web)', '25', 'SMTP (Email)'], ['3306', 'MySQL', '21', 'FTP']], 'soft', first_name=False)
    ports = ports.replace('<td>22</td>', '<td class="r">22</td>')
    for p in ['53', '80', '443', '3306', '5432', '27017', '6379', '25', '21']:
        ports = ports.replace(f'<td>{p}</td>', f'<td class="r">{p}</td>')
    pbox = box('rem', 'Important Ports (Most Used)', ports, ' ')
    rm = rem(ul(['DNS translates domains to IPs.', 'IP routes packets to destination.', 'TCP = Reliable, UDP = Fast.', 'Firewalls control what is allowed.', 'Always use HTTPS for security.'], 'ck'), '⭐ Remember')
    bp = box('rem', 'Best Practices', ul(['Use least privilege access.', 'Keep security groups tight.', 'Monitor network traffic &amp; logs.', 'Encrypt data in transit (HTTPS/TLS).', 'Document network architecture.'], 'ck'), '🛡️')
    s3 = sec(3, 'Quick Notes', grid('g3', pbox, rm, bp), 'wide')
    return chapter(18, 'Networking Cheat Sheet', s1 + s2 + s3)
